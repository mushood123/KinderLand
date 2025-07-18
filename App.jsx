import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { PublicStack } from './src/navigations';

function App() {

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <PublicStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}



export default App;
