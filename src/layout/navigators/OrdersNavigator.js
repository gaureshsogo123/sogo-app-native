import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "../../contexts/authContext";

import Orders from "../../screens/orders/view/Orders";
import UpdateOrder from "../../screens/SalesOrder/views/UpdateOrder";

const OrderStackNavigator = createNativeStackNavigator();

export default OrderNavigator = () => {
  const { user } = useAuthContext();
  return (
    <OrderStackNavigator.Navigator>
      <OrderStackNavigator.Screen
        name="OrdersList"
        component={Orders}
        options={{
          title: "My Orders",
        }}
      />
      <OrderStackNavigator.Screen
        name="UpdateOrder"
        component={UpdateOrder}
        options={{
          title: "Update Order",
        }}
      />
    </OrderStackNavigator.Navigator>
  );
};
