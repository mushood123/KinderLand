import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from './home';
import { Customers } from './customers';
import { Reports } from './reports';
import { Products } from './products';
import { EditOrder } from './editOrder';
import { SizeQuantity } from './sizeQuantity';
import { AddOrder } from './addOrder';
import { Notifications } from './notifications';
import { ProfileNavigator } from './profile';

import { SVGCustomers, SVGHome, SVGProducts, SVGReports, SVGAdd } from '../../assets';

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
            <Stack.Screen
                name="Size Quantity"
                component={SizeQuantity}
                options={{
                    headerShown: true
                }} />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerShown: true
                }} />
            <Stack.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    headerShown: false,
                    title: 'Profile'
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
                name="Add Order"
                component={AddOrder}
                options={{
                    tabBarIcon: ({ focused }) => <SVGAdd size="30px" />,
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