import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { PublicStack } from './src/navigations';
import { StatusBar } from 'react-native';
import { UserProvider } from './src/context';
function App() {

  return (
    <UserProvider>
      <GestureHandlerRootView>
        <StatusBar hidden={true} />
        <NavigationContainer>
          <PublicStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </UserProvider>
  );
}



export default App;
