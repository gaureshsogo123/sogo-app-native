import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/landingpage/view/LandingScreen';
import Orders from '../screens/orders/view/Orders';

const Tab = createBottomTabNavigator();


export default function BottomNav(){
    return(
        <Tab.Navigator>
        <Tab.Screen name="Home" component={LandingScreen}/>
        <Tab.Screen name="orders" component={Orders}/>
      </Tab.Navigator>
   
    )
}
