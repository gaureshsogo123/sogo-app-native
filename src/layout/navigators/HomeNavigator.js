import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "../../contexts/authContext";

import LandingScreen from "../../screens/landingpage/view/LandingScreen";
import CreateOrder from "../../screens/SalesOrder/views/CreateOrder";
import UpdateOrder from "../../screens/SalesOrder/views/UpdateOrder";

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
        name="CreateOrder"
        component={CreateOrder}
        options={{
          title: "Create Sales Order",
        }}
      />
      <HomeStackNavigator.Screen
        name="UpdateOrder"
        component={UpdateOrder}
        options={{
          title: "Update Order",
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};
