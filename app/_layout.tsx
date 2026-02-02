import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/store/index';
import Toast from '@/components/base/Toast';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast />
    </Provider>
  );
}