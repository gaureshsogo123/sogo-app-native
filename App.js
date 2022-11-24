import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import AuthContextProvider from "./src/contexts/authContext";
import Routes from "./Routes";

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
