import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from "../constants/Colors";
import {Css} from "../constants/Css";

export default function HeaderHackum({text}) {
  return (
    <View style={Css.headerWrapper}>
      <Text style={styles.headerText}>{text}</Text>
      <Text style={styles.subTitle}>Хувийн санхүүч апп</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});