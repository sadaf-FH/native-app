import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ToastProvider } from "expo-toast";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Stack screenOptions={{headerShown: false}}/>
      </ToastProvider>
    </Provider>
  );
}
