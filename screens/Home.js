import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl, BackHandler} from 'react-native';
import {colors} from "../constants/Colors";
import axios from "axios";
import {backUrl, RenderList} from "../constants/Functions";
import {Css} from "../constants/Css";
import {useSelector} from "react-redux";
import {formatMoney} from "../constants/Format";

export const Home = () => {
  const [todayList, setTodayList] = useState([]);
  const [otherList, setOtherList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const auth = useSelector((state) => state.auth);
  const getList = () => {
    setIsLoading(true);
    if (auth.group && auth.group !== '') {
      Promise.all([
        axios.get(backUrl+'/list/today?group=' + auth.group),
        axios.get(backUrl+'/list/other?group=' + auth.group),
        axios.get(backUrl+'/group?title=' + auth.group)]).then(values => {
        setTodayList(values[0].data);
        setOtherList(values[1].data);
        setBalance(values[2].data?.balance);
        setIsLoading(false);
        setRefreshing(false);
      })
    } else {
      Promise.all([
        axios.get(backUrl+'/list/today?phone='+auth.phone),
        axios.get(backUrl+'/list/other?phone='+auth.phone),
        axios.get(backUrl+'/user?phone=' + auth.phone)]).then(values => {
        setTodayList(values[0].data);
        setOtherList(values[1].data);
        setBalance(values[2].data?.balance);
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
      <View style={styles.header}>
        <Text style={Css.inactiveText}>Таны хэтэвчинд:</Text>
        <Text style={styles.amount}>{formatMoney(balance, 0)}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <RenderList headerText={'Өнөөдөр'} isLoading={isLoading} list={todayList}/>
        <RenderList headerText={'Бусад'} isLoading={isLoading} list={otherList}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    lineHeight: 33
  },
  header: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
});