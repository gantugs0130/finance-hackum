import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Icon} from 'react-native-elements'
import {colors} from "../constants/Colors";

export default function CustomInput({placeHolder, icon, inputType, setText, value, onBlur, hasError}) {
  const errorStyle = hasError ? {borderColor: colors.red} : {};
  return (
    <View style={{...styles.wrapper, ...errorStyle}}>
      <Icon name={icon}
            color={colors.dark}
            type={'ionicon'}
            size={14}
            style={{marginHorizontal: 10}}/>
      <TextInput style={styles.text}
                 value={value}
                 onBlur={onBlur}
                 keyboardType={inputType}
                 placeholder={placeHolder}
                 placeholderTextColor={colors.white30}
                 placeholderStyle={styles.placeholderStyle}
                 onChangeText={(text) => {
                   setText(text)
                 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderStyle:
    {
      fontWeight: 'bold',
    },
  wrapper:
    {
      borderWidth: 2,
      borderColor: colors.white20,
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      backgroundColor: colors.white20,
      borderRadius: 17,
      paddingHorizontal: 8
    },
  text:
    {
      flex: 1,
      lineHeight: 19,
      color:
      colors.dark,
      fontSize: 16,
      fontWeight:
        '600'
    }
});