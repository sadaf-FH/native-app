import { store } from '@/store/store';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

export default function RootLayout() {
  useEffect(() => {
    console.log('Store initialized:', store);
  }, []);

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </Provider>
  );
}