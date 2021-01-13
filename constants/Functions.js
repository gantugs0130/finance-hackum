import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import ListItem from "../components/ListItem";
import {Css} from "./Css";
import {colors} from "./Colors";

export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "+";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "") + '₮';
  } catch (e) {
    console.log(e)
  }
}

export const RenderListView = ({items}) => {
  if (items.length === 0)
    return <Text>Одоогоор хоосон байна</Text>
  return items.map((item) =>
    <ListItem key={item._id} text={item.title} amount={item.amount} type={item.type} date={item.date}/>
  );
}
export const RenderList = ({headerText, isLoading, list}) => {
  return (
    <View>
      <View style={Css.headerWithLine}>
        <Text style={Css.inactiveText}>{headerText}</Text>
      </View>
      <View>
        {
          isLoading ?
            <ActivityIndicator style={Css.loader} size="small" color={colors.green}/> : <RenderListView items={list}/>
        }
      </View>
    </View>)
}