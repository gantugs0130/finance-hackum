import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'

export const IconWithButton = ({color, icon, size, backColor, onPress}) => {

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={.7}
      style={{
        ...styles.wrapper,
        backgroundColor: backColor,
        height: size,
        width: size,
        borderRadius: size
      }}>
      <Icon name={icon}
            color={color}
            size={size / 2}/>

    </TouchableOpacity>
  )
    ;
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});