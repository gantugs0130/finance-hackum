import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from "../constants/Colors";
import {formatMoney} from "../constants/Functions";

export default function ListItem({amount, text, type = 0, date = null}) {
  const amountColor = type.toString() === '1' ? colors.red : colors.green
  const operator = type.toString() === '1' ? '-' : '+'
  return (
    <View style={styles.wrapper}>
      {!!date ?
        <View>
          <Text style={styles.textColor}>{text}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View> :
        < Text style={styles.textColor}>{text}</Text>
      }
      <Text style={{...styles.amount, color: amountColor}}>{formatMoney(operator + amount, 0)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textColor: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.dark,
    fontWeight: 'normal'
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16
  },
  dateText: {
    fontSize: 10,
    fontWeight: 'normal',
    color: colors.white30,
    lineHeight: 14
  },
  wrapper: {
    flexDirection: 'row',
    height: 39,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});