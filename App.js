import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';

import LoginScreen from './components/pages/Login';
import CreateUser from './components/pages/CreateUser';
import ChatList from './components/pages/ChatList';
import Settings from './components/pages/Settings';
import Paymant from './components/pages/Paymant';
import Perfil from './components/pages/Perfil';

const Stack = createStackNavigator();

const config = {
  apiKey: 'AIzaSyCOIEMawvjpyThmJTgXEjRLo5ovnipa9M8',
  authDomain: 'bigfiap.firebaseapp.com',
  databaseURL: 'https://bigfiap-default-rtdb.firebaseio.com',
  projectId: 'bigfiap',
  storageBucket: 'bigfiap.appspot.com',
  messagingSenderId: '741916212372',
};

function App() {
  if (!firebase.apps.length) firebase.initializeApp(config);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
        headerShown: false,
        headerTransparent: true,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} 
        />
        <Stack.Screen name="Criar Usuário" component={CreateUser} options={{ headerShown: true, headerTintColor: 'orange',}}/>
        <Stack.Screen
          name="Chat List"
          component={ChatList}
          options={{ headerShown: false, headerTransparent: true,  }}
        />
        
        <Stack.Screen 
          name="Settings" 
          component={Settings} 
          options={{ headerShown: false, headerTransparent: true, }}
        />
        <Stack.Screen 
          name="Paymant" 
          component={Paymant} 
          options={{ headerShown: true, headerTransparent: true,}}
        />
        <Stack.Screen 
          name="Perfil" 
          component={Perfil} 
          options={{ headerShown: false, headerTransparent: true,}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;