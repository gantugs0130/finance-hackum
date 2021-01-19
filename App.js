import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Init} from "./screens/Init";
import {MainTabNavigation} from "./screens/MainTabNavigation";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider, useSelector} from 'react-redux';
import {setAuthGroup, setLoginState} from "./redux/actions/Auth";
import store from "./redux/store/configureStore";


export default function App() {
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    AsyncStorage.getItem('phone').then((value) => {
      if (value) {
        store.dispatch(setLoginState({phone: value}));
      }
    });
    AsyncStorage.getItem('group').then((value) => {
      if (value) {
        store.dispatch(setAuthGroup(value));
      }
    });
  }, []);

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {!auth.login ?
          <Stack.Screen
            screenOptions={{
              headerShown: false
            }}
            name="Init"
            component={Init}/> :
          <Stack.Screen
            name="MainTabNavigation"
            component={MainTabNavigation}/>
        }
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)}/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
