import { Alert, Platform } from 'react-native';

interface AlertOptions {
  title: string;
  message: string;
  buttonText?: string;
}

export const showAlert = ({ title, message, buttonText = 'OK' }: AlertOptions): void => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message, [{ text: buttonText }]);
  }
};
