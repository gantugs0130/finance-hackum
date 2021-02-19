import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import ListItem from "../components/ListItem";
import {Css} from "./Css";
import {colors} from "./Colors";

export const RenderListView = ({items}) => {
  if (items.length === 0)
    return <Text>Одоогоор хоосон байна</Text>
  return items.map((item) => {
      return <ListItem
        phone={item.phone}
        key={item._id + Math.random()}
        text={item.title}
        amount={item.amount}
        type={item.type}
        date={item.date}/>
    }
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

export const backUrl = 'http://192.168.1.2:3000';