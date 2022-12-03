import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import OrderReport from "../screens/orderreport/view/OrderReport";
import Signout from "../screens/Signout/view/Signout,";
import HomeNavigator from "./navigators/HomeNavigator";
import OrdersNavigator from "./navigators/OrdersNavigator";

const Tab = createBottomTabNavigator();

const defaultTabOptions = {
  tabBarHideOnKeyboard: true,
};

export default function BottomNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={"Home"}
        component={HomeNavigator}
        options={{
          tabBarIcon: (props) => <BottomIconContainer name="home" {...props} />,
          headerShown: false,
          ...defaultTabOptions,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          tabBarIcon: (props) => <BottomIconContainer name="book" {...props} />,
          title: "My Orders",
          headerShown: false,
          ...defaultTabOptions,
          headerTitleStyle: { marginLeft: 10 },
        }}
      />
      <Tab.Screen
        name="Order Report"
        component={OrderReport}
        options={{
          tabBarIcon: (props) => (
            <BottomIconContainer name="filetext1" {...props} />
          ),
          title: "Order Report",
          ...defaultTabOptions,
          headerTitleStyle: { marginLeft: 8 },
        }}
      />
      <Tab.Screen
        name="Sign Out"
        component={Signout}
        options={{
          tabBarIcon: (props) => (
            <BottomIconContainer name="logout" {...props} />
          ),
          ...defaultTabOptions,
        }}
      />
    </Tab.Navigator>
  );
}

const BottomIconContainer = ({ name, focused, color = "black" }) => {
  return <AntDesign name={name} size={25} color={focused ? color : "black"} />;
};
