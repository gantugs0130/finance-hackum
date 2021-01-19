import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {colors} from "../constants/Colors";
import {Home} from "./Home";
import expense from "./Expense";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Income} from "./Income";

export const Main = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{flex: 1, backgroundColor:colors.white}}>
      <Tab.Navigator
        tabBarOptions={{
          style: styles.navigation,
          activeTintColor: colors.dark,
          inactiveTintColor: colors.white30,
          indicatorStyle: {
            width: 50,
            left: '8.5%',
            backgroundColor: colors.green
          },
          labelStyle: {
            fontSize: 16,
            fontWeight: '100',
            textTransform: 'none',
          },
        }}
      >
        <Tab.Screen name="Үлдэгдэл" component={Home}/>
        <Tab.Screen name="Орлого" component={Income}/>
        <Tab.Screen name="Зарлага" component={expense}/>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.white20,
    borderRadius: 15,
    height: 61,
    justifyContent: 'center',
    marginHorizontal: 25,
    elevation: 0
  },
});