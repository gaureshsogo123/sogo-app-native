import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingScreen from "../screens/landingpage/view/LandingScreen";
import Orders from "../screens/orders/view/Orders";
import SalesOrder from "../screens/SalesOrder/views/SalesOrder";
import SignIn from "../screens/SignIn/views/SignIn";

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={LandingScreen} />
      <Tab.Screen name="orders" component={Orders} />
      <Tab.Screen
        name="salesorder"
        component={SalesOrder}
        options={{ title: "Select products" }}
      />
      <Tab.Screen name="signin" component={SignIn} />
    </Tab.Navigator>
  );
}
