import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingScreen from "../screens/landingpage/view/LandingScreen";
import Orders from "../screens/orders/view/Orders";
import { AntDesign } from "@expo/vector-icons";
import SalesOrder from "../screens/SalesOrder/views/SalesOrder";
import OrderReport from "../screens/orderreport/view/OrderReport";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SignIn from "../screens/SignIn/views/SignIn";
import { useAuthContext } from "../contexts/authContext";

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  const { user } = useAuthContext();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={"Home"}
        component={LandingScreen}
        options={{
          tabBarIcon: () => <BottomIconContainer name="home" />,
          title: user?.userName || "Home",
        }}
      />
      <Tab.Screen name="orders" component={Orders} />
      <Tab.Screen
        name="book"
        component={Orders}
        options={{
          tabBarIcon: () => <BottomIconContainer name="book" />,
        }}
      />
      <Tab.Screen
        name="orderReport"
        component={OrderReport}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home-variant-outline" size={25} />
          ),
        }}
      />
      <Tab.Screen name="salesorder" component={SalesOrder} />
      <Tab.Screen name="signin" component={SignIn} />
    </Tab.Navigator>
  );
}

const BottomIconContainer = ({ name }) => {
  return <AntDesign name={name} size={25} color="black" />;
};
