import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Icon} from 'react-native-elements'
import {colors} from "../constants/Colors";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

export const CustomPinCode = ({icon, setText, value, hasError}) => {
  const errorStyle = hasError ? {borderColor: colors.red} : {};
  return (
    <View style={{...styles.wrapper, ...errorStyle}}>
      <Icon name={icon}
            color={colors.dark}
            type={'ionicon'} size={14}
            style={{marginHorizontal: 10}}/>
      <SmoothPinCodeInput
        containerStyle={{justifyContent: 'flex-start'}}
        placeholder={<View style={styles.pinPlaceHolder}/>}
        mask={<View style={styles.mask}/>}
        maskDelay={1000}
        password={true}
        cellStyle={styles.cellStyle}
        cellStyleFocused={styles.cellFocusedStyle}
        value={value}
        onTextChange={code => {
          setText(code);
        }}
        textStyle={styles.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cellStyle: {
    width: 25,
    height: 25,
  },
  cellFocusedStyle: {
    width: 25,
    height: 25,
    borderColor: colors.green,
    borderRadius: 10,
    borderWidth: 2
  },
  placeholderStyle: {
    fontWeight: 'bold',
  },
  wrapper: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: colors.white20,
    borderRadius: 17,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: colors.white20,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 19,
    color: colors.dark,
    fontSize: 16,
    fontWeight: '600'
  },
  mask: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: colors.green,
  },
  pinPlaceHolder: {
    width: 10,
    height: 10,
    borderRadius: 25,
    opacity: 0.3,
    backgroundColor: colors.green,
  },
});