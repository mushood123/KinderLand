import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { PublicStack } from './src/navigations';
import { StatusBar } from 'react-native';

function App() {

  return (
    <GestureHandlerRootView>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <PublicStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}



export default App;
