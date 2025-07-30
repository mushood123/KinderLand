import React from 'react';
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
import { EditCustomer } from './editCustomer';
import { CustomerInformation } from './customerInformation';
import { CreateCustomer } from './createCustomer';
import { SelectProduct } from './selectProduct';
import { ProductTotal } from './productTotal';
import { OrderCart } from './orderCart';
import { DigitalSignature } from './digitalSignature';
import { GeneratePdf } from './generatePdf';
import {
  SVGCustomers,
  SVGHome,
  SVGProducts,
  SVGReports,
  SVGAdd,
} from '../../assets';
import { ShippingInfo } from './shippingInfo';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileWrapper = React.memo(() => {
  console.log('ProfileWrapper rendered');
  return <ProfileNavigator />;
});

const HomeStack = () => {
  console.log('HomeStack rendered');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Edit Order"
        component={EditOrder}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Size Quantity"
        component={SizeQuantity}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileWrapper}
        options={{
          headerShown: false,
          title: 'Profile',
        }}
      />
    </Stack.Navigator>
  );
};

const CustomerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Customers"
        component={Customers}
        options={{
          headerShown: true,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Customer Information"
        component={CustomerInformation}
        options={{
          headerShown: true,
          title: 'Customer Details',
        }}
      />
      <Stack.Screen
        name="Edit Customer"
        component={EditCustomer}
        options={{
          headerShown: true,
          title: 'Edit Customer',
        }}
      />
      <Stack.Screen
        name="Create Customer"
        component={CreateCustomer}
        options={{
          headerShown: true,
          title: 'Create Customer',
        }}
      />
    </Stack.Navigator>
  );
};

const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add Order"
        component={AddOrder}
        options={{
          headerLeft: () => null,
          headerShown: true,
          title: 'New Order',
        }}
      />
      <Stack.Screen
        name="Select Product"
        component={SelectProduct}
        options={{
          headerShown: true,
          title: 'Select Product',
        }}
      />
      <Stack.Screen
        name="Product Total"
        component={ProductTotal}
        options={{
          headerShown: true,
          title: 'Product Total',
        }}
      />
      <Stack.Screen
        name="Order Cart"
        component={OrderCart}
        options={{
          headerShown: true,
          title: 'Cart',
        }}
      />
      <Stack.Screen
        name="Shipping Info"
        component={ShippingInfo}
        options={{
          headerShown: true,
          title: 'Shipping Info',
        }}
      />
      <Stack.Screen
        name="Digital Signature"
        component={DigitalSignature}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Generate PDF"
        component={GeneratePdf}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeStackWrapper = React.memo(() => {
  console.log('HomeStackWrapper rendered');
  return <HomeStack />;
});

export const Dashboard = ({ route }) => {
  const { handleLogout } = route.params || {};
  console.log('handleLogout from dashboard', handleLogout);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackWrapper}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <SVGHome size="25px" />,
        }}
      />
      <Tab.Screen
        name="Customers"
        component={CustomerStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <SVGCustomers size="30px" />,
        }}
      />
      <Tab.Screen
        name="Add Order"
        component={OrderStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <SVGAdd size="30px" />,
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          headerShown: true,
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
  );
};
