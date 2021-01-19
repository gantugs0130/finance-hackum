import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Login} from "./Login";
import {createStackNavigator} from '@react-navigation/stack';
import {SignUp} from "./SignUp";

export const Init =(navigation)=> {

  const Stack = createStackNavigator();
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
