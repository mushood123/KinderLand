import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ViewProfile } from './viewProfile';
import { EditProfile } from './editProfile';

const Stack = createStackNavigator();

const ViewProfileWrapper = React.memo(() => {
  console.log('ViewProfileWrapper rendered');
  return <ViewProfile />;
});

export const ProfileNavigator = () => {
  console.log('ProfileNavigator rendered');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfileWrapper}
        options={{ title: "Profile" }}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Edit Profile" }} />
    </Stack.Navigator>
  );
}