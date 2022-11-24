import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "../../contexts/authContext";

import LandingScreen from "../../screens/landingpage/view/LandingScreen";
import SalesOrder from "../../screens/SalesOrder/views/SalesOrder";

const HomeStackNavigator = createNativeStackNavigator();

export default HomeNavigator = () => {
  const { user } = useAuthContext();
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name="LandingPage"
        component={LandingScreen}
        options={{
          title: user?.userName,
        }}
      />
      <HomeStackNavigator.Screen
        name="SalesOrder"
        component={SalesOrder}
        options={{
          title: "Create Sales Order",
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};
