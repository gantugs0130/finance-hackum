import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet, Text, TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from "../constants/Colors";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HeaderHackum from "../components/HeaderHackum";
import {AddTransactionModal} from "../modals/AddTransactionModal";
import {Main} from "./Main";
import {Profile} from "./Profile";
import {Icon} from 'react-native-elements'

export const MainTabNavigation = (navigation) => {
  const Tab = createMaterialBottomTabNavigator();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => {
    setIsModalVisible(false);
  }
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Modal
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}
        animationIn={'slideInUp'}
        onBackdropPress={() => hideModal()}
        onSwipeComplete={() => hideModal()}
        swipeDirection="down"
        isVisible={isModalVisible}>
        <AddTransactionModal setVisible={hideModal}/>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true)
        }}
        activeOpacity={.7}
        style={styles.addBtn}>
        <Icon name={'add-outline'}
              color={colors.white}
              size={30}
              type={'ionicon'}
        />
      </TouchableOpacity>
      <Tab.Navigator
        barStyle={{backgroundColor: colors.white5}}
        activeColor={colors.green}
        inactiveColor={colors.white30}>
        <Tab.Screen
          name="Main"
          component={Main}
          options={{
            tabBarLabel: 'Эхлэл',
            tabBarIcon: ({color}) => (
              <Icon type={'ionicon'} name="home-outline" color={color} size={26}/>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Тохиргоо',
            tabBarIcon: ({color}) => (
              <Icon type={'ionicon'} name="settings-outline" color={color} size={26}/>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: colors.green,
    left: Dimensions.get('window').width / 2 - 30,
    bottom: 25,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center'
  }
});