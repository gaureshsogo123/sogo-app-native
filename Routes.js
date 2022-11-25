import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./src/layout/BottomNav";
import { useAuthContext } from "./src/contexts/authContext";
import SignIn from "./src/screens/SignIn/views/SignIn";

const Stack = createNativeStackNavigator();

function Routes() {
  const { isLoggedIn } = useAuthContext();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn() ? (
          <Stack.Screen
            name="BottomNav"
            component={BottomNav}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
