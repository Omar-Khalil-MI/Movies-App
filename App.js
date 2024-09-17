import { createDrawerNavigator } from '@react-navigation/drawer';
import Favourites from './Screens/Favourites';
import Home from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { store } from "./Redux_ToolKit/movieStore"
import { Provider } from 'react-redux';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar />
        <Drawer.Navigator screenOptions={{
          drawerStyle: { backgroundColor: "#212121" },
          drawerLabelStyle: { color: "white" },
        }}>
          <Drawer.Screen name='Home' component={Home}
            options={{ headerTintColor: "white", headerStyle: { backgroundColor: "#212121" } }} />
          <Drawer.Screen name='Favourites' component={Favourites}
            options={{ headerTintColor: "white", headerStyle: { backgroundColor: "#212121" } }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
