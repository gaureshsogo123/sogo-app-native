import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import AuthContextProvider from "./src/contexts/authContext";
import BottomNav from "./src/layout/BottomNav";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
        <AuthContextProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="bottomnav"
                component={BottomNav}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
