import { Redirect } from 'expo-router';
import { useAppSelector } from '@/store/hooks';
import RegisterScreen from '@/components/RegisterScreen';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function Index() {
  const isRegistered = useAppSelector((state) => state.user.isRegistered);

  if (isRegistered) {
    return <Provider store={store}> <Redirect href="/profile" /> </Provider>;
  }

  return <RegisterScreen />;
}