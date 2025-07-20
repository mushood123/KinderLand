import { createStackNavigator } from '@react-navigation/stack';
import { ViewProfile } from './viewProfile';
import { EditProfile } from './editProfile';

const Stack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ViewProfile" component={ViewProfile} options={{ title: "Profile" }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Edit Profile" }} />
    </Stack.Navigator>
  );
}