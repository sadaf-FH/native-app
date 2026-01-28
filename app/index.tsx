import { Redirect } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import RegisterScreen from "@/components/RegisterScreen";

export default function Index() {
  const isRegistered = useAppSelector(
    (state) => state.user.isRegistered
  );

  if (isRegistered) {
    return <Redirect href="/profile" />;
  }

  return <RegisterScreen />;
}
