import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl, SafeAreaView, ActivityIndicator} from 'react-native';
import {colors} from "../constants/Colors";
import axios from "axios";
import {backUrl, RenderList} from "../constants/Functions";
import {Css} from "../constants/Css";
import {useSelector} from "react-redux";
import {formatMoney} from "../constants/Format";

export const Income = () => {
  const [list, setList] = React.useState([]);
  const [stats, setStat] = React.useState({lastMonth: 0, lastSixMonth: 0});
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const auth = useSelector((state) => state.auth);
  const getList = () => {
    setIsLoading(true);
    if (auth.group && auth.group !== '') {
      Promise.all([axios.get(backUrl+'/list?type=0&group=' + auth.group),
        axios.get(backUrl+'/list/lastMonths?type=0&month=5&group=' + auth.group),
        axios.get(backUrl+'/list/lastMonths?type=0&month=0&&group=' + auth.group)]).then(values => {
        setList(values[0].data);
        setStat({lastMonth: values[2].data.amount, lastSixMonth: values[1].data.amount});
        setIsLoading(false);
        setRefreshing(false);
      })
    } else {
      Promise.all([axios.get(backUrl+'/list?type=0&phone=' + auth.phone),
        axios.get(backUrl+'/list/lastMonths?type=0&month=5&phone=' + auth.phone),
        axios.get(backUrl+'/list/lastMonths?type=0&month=0&&phone=' + auth.phone)]).then(values => {
        setList(values[0].data);
        setStat({lastMonth: values[2].data.amount, lastSixMonth: values[1].data.amount});
        setIsLoading(false);
        setRefreshing(false);
      })
    }
  }
  useEffect(() => {
    getList();
  }, [refreshing])
  const onRefresh = () => {
    setRefreshing(true);
  }
  return (
    <View style={Css.container}>
      <View style={Css.header}>
        <View style={{...Css.staticWrapper, backgroundColor: '#E6F4EA'}}>
          <Text style={Css.subTile}>Энэ сард:</Text>
          <Text style={styles.amount}>{formatMoney(stats.lastMonth, 0)}</Text>
        </View>
        <View style={{...Css.staticWrapper, backgroundColor: '#F3F9FE'}}>
          <Text style={Css.subTile}>Сүүлийн 6 сард:</Text>
          <Text style={styles.amount}>{formatMoney(stats.lastSixMonth, 0)}</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <RenderList headerText={'Дэлгэрэнгүй'} isLoading={isLoading} list={list}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    color: colors.green,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19
  },
});