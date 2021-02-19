import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from "../constants/Colors";
import {formatMoney} from "../constants/Format";

export default function ListItem({phone, amount, text, type = 0, date = null}) {
  const amountColor = type.toString() === '1' ? colors.red : colors.green
  const operator = type.toString() === '1' ? '-' : '+'
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.white20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>{phone.toString().substr(6, 2)}</Text>
      </View>
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
    flex: 1,
    flexDirection: 'row',
    height: 39,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});