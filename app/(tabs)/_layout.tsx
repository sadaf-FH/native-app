import { Stack, Tabs } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    console.log('Store initialized:', store);
  }, []);

  return (
    <Provider store={store}>
      <Tabs>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="menu" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="search" />
      </Stack>
      </Tabs>
    </Provider>
  );
}