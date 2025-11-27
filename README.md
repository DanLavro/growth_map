# Growth Map

React Native + Expo приложение "Карта развития" — экран со списком модулей обучения.

## Запуск

```bash
npm install
npm run ios      # iOS симулятор
npm run android  # Android эмулятор
npm run web      # Браузер
```

## Структура проекта

```
src/
├── components/     # UI компоненты
├── screens/        # Экраны приложения
├── hooks/          # Кастомные хуки
├── utils/          # Утилиты
├── constants/      # Дизайн-токены, константы
├── types/          # TypeScript типы
└── data/           # Данные
```

## Применённые практики

### Архитектура и структура
- Разделение на слои: `components`, `screens`, `hooks`, `utils`, `constants`, `types`, `data`
- Barrel exports (`index.ts`) для чистых импортов
- Один компонент — один файл

### TypeScript
- Строгий `tsconfig`: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`
- Path aliases (`@components/*`, `@screens/*`, etc.)
- Явная типизация: `interface` для пропсов, `Record<K, V>` для маппингов
- Современный синтаксис без `React.FC`

### React оптимизации
- `memo()` для предотвращения лишних ре-рендеров
- `useCallback()` для стабильных ссылок на функции
- `displayName` для удобной отладки в DevTools
- Вынесение `keyExtractor` и `renderItem` из JSX

### Стилизация
- Дизайн-токены: `COLORS`, `SPACING`, `FONT_SIZE`, `FONT_WEIGHT`, `BORDER_RADIUS`, `SHADOW`
- `as const` для иммутабельности констант
- `StyleSheet.create()` для оптимизации стилей

### Кроссплатформенность
- Утилита `showAlert()` с `Platform.OS` для web/native

### Чистый код
- DRY: `STATUS_STYLES`, `STATUS_LABELS`, `STATUS_ICONS`
- Кастомные хуки для бизнес-логики (`useModulesProgress`)
- Деструктуризация пропсов
- Избегание оверинжиниринга (без лишних `useMemo`)
