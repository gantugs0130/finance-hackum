import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from "../constants/Colors";

export const CustomButton = ({text, isFilled = false, color, onClick, disabled = false, bgColor = colors.green}) => {
  let wrapperBackgroundColor = {};
  if (isFilled) {
    wrapperBackgroundColor = {backgroundColor: bgColor};
  }
  return (
    <TouchableOpacity disabled={disabled}
                      activeOpacity={.7}
                      style={{...styles.wrapper, ...wrapperBackgroundColor}}
                      onPress={() => onClick()}
    >
      <View style={{flexDirection: 'row', justifyContent: 'center', marginLeft: -20}}>
        <ActivityIndicator color={color} animating={disabled}/>
        <Text style={{...styles.text, color: color}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    alignItems: 'center',
    borderRadius: 17,
    justifyContent: 'center',
  },
  text: {
    lineHeight: 19,
    fontSize: 14,
    fontWeight: '600'
  }
});