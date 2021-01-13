import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl, SafeAreaView, ActivityIndicator} from 'react-native';
import {colors} from "../constants/Colors";
import {Css} from "../constants/Css";
import axios from "axios";
import {formatMoney, RenderList, RenderListView} from "../constants/Functions";

export default function expense() {
  const [list, setList] = React.useState([]);
  const [stats, setStat] = React.useState({lastMonth: 0, lastSixMonth: 0});
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const getList = () => {
    setIsLoading(true);
    Promise.all([
      axios.get('http://192.168.1.6:3000/list?type=1'),
      axios.get('http://192.168.1.6:3000/list/lastMonths?type=1&month=5'),
      axios.get('http://192.168.1.6:3000/list/lastMonths?type=1&month=0')]).then(values => {
      setList(values[0].data);
      setStat({lastMonth: values[1].data.amount, lastSixMonth: values[2].data.amount});
      setIsLoading(false);
      setRefreshing(false);
    })
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
        <View style={{...Css.staticWrapper, backgroundColor: 'rgba(228, 25, 25, 0.14)'}}>
          <Text style={Css.subTile}>Энэ сард:</Text>
          <Text style={styles.amount}>{formatMoney(-stats.lastMonth, 0)}</Text>
        </View>
        <View style={{...Css.staticWrapper, backgroundColor: '#F3F9FE'}}>
          <Text style={Css.subTile}>Сүүлийн 6 сард:</Text>
          <Text style={styles.amount}>{formatMoney(-stats.lastSixMonth, 0)}</Text>
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
    color: colors.red,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19
  }
});