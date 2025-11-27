# Database Design (Supabase/Postgres)

## Таблицы

### 1. `modules` — Модули обучения

```sql
CREATE TABLE modules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INT NOT NULL,           -- порядок в списке
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. `users` — Пользователи

```sql
-- Supabase Auth создаёт таблицу auth.users автоматически
-- Дополнительные данные:
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. `user_progress` — Прогресс пользователя

```sql
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id INT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'locked',  -- 'locked' | 'active' | 'done'
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  UNIQUE(user_id, module_id)  -- один статус на пользователя/модуль
);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
```

## Связь пользователя и статуса

```
auth.users (1) ──────< (N) user_progress (N) >────── (1) modules
```

- Один пользователь → много записей прогресса
- Один модуль → много записей прогресса (от разных пользователей)
- `UNIQUE(user_id, module_id)` гарантирует одну запись на пару

## Эффективная выдача на фронтенд

### Вариант 1: View с COALESCE

```sql
CREATE VIEW user_modules_view AS
SELECT
  m.id,
  m.title,
  m.order_index,
  up.user_id,
  COALESCE(up.status, 'locked') AS status,
  up.completed_at
FROM modules m
LEFT JOIN user_progress up ON m.id = up.module_id
ORDER BY m.order_index;
```

**Запрос:**
```sql
SELECT * FROM user_modules_view WHERE user_id = $1 OR user_id IS NULL;
```

### Вариант 2: RPC функция (рекомендуется)

```sql
CREATE OR REPLACE FUNCTION get_user_modules(p_user_id UUID)
RETURNS TABLE (
  id INT,
  title VARCHAR,
  status VARCHAR,
  is_available BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.id,
    m.title,
    COALESCE(up.status, 'locked')::VARCHAR AS status,
    -- Доступен если: первый модуль ИЛИ предыдущий завершён
    (m.order_index = 1 OR EXISTS (
      SELECT 1 FROM user_progress prev_up
      JOIN modules prev_m ON prev_m.id = prev_up.module_id
      WHERE prev_up.user_id = p_user_id
        AND prev_m.order_index = m.order_index - 1
        AND prev_up.status = 'done'
    )) AS is_available
  FROM modules m
  LEFT JOIN user_progress up
    ON m.id = up.module_id AND up.user_id = p_user_id
  ORDER BY m.order_index;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Вызов из Supabase:**
```typescript
const { data } = await supabase.rpc('get_user_modules', {
  p_user_id: user.id
});
```

**Результат:**
```json
[
  { "id": 1, "title": "Welcome Journey", "status": "done", "is_available": true },
  { "id": 2, "title": "Переключение на себя", "status": "active", "is_available": true },
  { "id": 3, "title": "Источник вдохновения", "status": "locked", "is_available": false }
]
```

## Row Level Security (RLS)

```sql
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Пользователь видит только свой прогресс
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Пользователь может обновлять только свой прогресс
CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);
```

## Автоматическая активация следующего модуля

```sql
CREATE OR REPLACE FUNCTION activate_next_module()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'done' AND OLD.status != 'done' THEN
    INSERT INTO user_progress (user_id, module_id, status, started_at)
    SELECT
      NEW.user_id,
      m.id,
      'active',
      NOW()
    FROM modules m
    WHERE m.order_index = (
      SELECT order_index + 1
      FROM modules
      WHERE id = NEW.module_id
    )
    ON CONFLICT (user_id, module_id)
    DO UPDATE SET status = 'active', started_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_module_completed
  AFTER UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION activate_next_module();
```

## Инициализация для нового пользователя

```sql
CREATE OR REPLACE FUNCTION init_user_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Активируем первый модуль для нового пользователя
  INSERT INTO user_progress (user_id, module_id, status, started_at)
  SELECT
    NEW.id,
    m.id,
    'active',
    NOW()
  FROM modules m
  WHERE m.order_index = 1;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_created
  AFTER INSERT ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION init_user_progress();
```
