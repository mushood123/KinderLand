import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from './home';
import { Customers } from './customers';
import { Reports } from './reports';
import { Products } from './products';
import { EditOrder } from './editOrder';
import { SVGCustomers, SVGHome, SVGProducts, SVGReports } from '../../assets';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen
                name="Edit Order"
                component={EditOrder}
                options={{
                    headerShown: true
                }} />
        </Stack.Navigator>
    );
}

export const Dashboard = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <SVGHome size="25px" />,
                }}
            />
            <Tab.Screen
                name="Customers"
                component={Customers}
                options={{
                    tabBarIcon: ({ focused }) => <SVGCustomers size="30px" />,
                }}
            />
            <Tab.Screen
                name="Reports"
                component={Reports}
                options={{
                    tabBarIcon: ({ focused }) => <SVGReports size="30px" />,
                }}
            />
            <Tab.Screen
                name="Products"
                component={Products}
                options={{
                    tabBarIcon: ({ focused }) => <SVGProducts size="30px" />,
                }}
            />
        </Tab.Navigator>
    )
}