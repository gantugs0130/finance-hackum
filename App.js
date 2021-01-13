import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import main from "./screens/Main";
import income from "./screens/Income";
import expense from "./screens/Expense";
import {NavigationContainer} from "@react-navigation/native";
import {colors} from "./constants/Colors";
const Tab = createMaterialTopTabNavigator();
export default function App() {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={.5} onPress={() => {
        console.log('aa')
      }} style={styles.addButton}>
        <Text style={{fontSize: 50, color: colors.white, lineHeight: 60}}>+</Text>
      </TouchableOpacity>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Hackum</Text>
        <Text style={styles.subTitle}>Хувийн санхүүч апп</Text>
      </View>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            style:styles.navigation,
            activeTintColor: colors.dark,
            inactiveTintColor: colors.white30,
            indicatorStyle: {
              width:50,
              left:'8.5%',
              backgroundColor: colors.green
            },
            labelStyle: {
              fontSize: 16,
              fontWeight: '100',
              textTransform: 'none',
            },
          }}
        >
          <Tab.Screen name="Үлдэгдэл" component={main}/>
          <Tab.Screen name="Орлого" component={income}/>
          <Tab.Screen name="Зарлага" component={expense}/>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.white20,
    borderRadius: 15,
    height: 61,
    justifyContent: 'center',
    marginHorizontal: 25
  },
  addButton: {
    position: 'absolute',
    bottom: 36,
    right: 30,
    height: 60,
    width: 60,
    backgroundColor: colors.green,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 999
  },
  headerWrapper: {
    width: '100%',
    padding: 25,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 33,
    color: colors.dark
  },
  subTitle: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 20,
    color: colors.white30
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },
});
