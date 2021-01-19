import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Icon} from 'react-native-elements'
import {colors} from "../constants/Colors";

export const CustomText = ({text, icon}) => {

  return (
    <View style={styles.wrapper}>
      <Icon name={icon}
            color={colors.dark}
            type={'ionicon'} size={14}
            style={{marginHorizontal: 10}}/>
        <Text style={styles.text}>{text}</Text>
    </View>
  )
    ;
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: colors.white20,
    borderRadius: 17,
    paddingHorizontal: 8
  },
  text: {
    flexDirection: 'row',
    lineHeight: 19,
    color: colors.dark,
    fontSize: 14,
    fontWeight: '600'
  }
});