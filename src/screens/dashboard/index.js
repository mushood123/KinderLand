import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './home';
import { Customers } from './customers';
import { Reports } from './reports';
import { Products } from './products';
import { SVGCustomers, SVGHome, SVGProducts, SVGReports } from '../../assets';
const Tab = createBottomTabNavigator();

export const Dashboard = ()=>{
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                tabBarIcon: ({ focused }) => <SVGHome size="25px"/>,
                }}
            />
            <Tab.Screen
                name="Customers"
                component={Customers}
                options={{
                tabBarIcon: ({ focused }) => <SVGCustomers size="30px"/>,
                }}
            />
            <Tab.Screen 
                name="Reports" 
                component={Reports}
                options={{
                tabBarIcon: ({ focused }) => <SVGReports size="30px"/>,
                }}
            />
            <Tab.Screen 
                name="Products" 
                component={Products} 
                options={{
                tabBarIcon: ({ focused }) => <SVGProducts size="30px"/>,
                }}
            />
        </Tab.Navigator>    
    )
}