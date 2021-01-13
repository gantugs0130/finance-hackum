import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl, SafeAreaView, ActivityIndicator} from 'react-native';
import ListItem from "../components/ListItem"
import {colors} from "../constants/Colors";
import axios from "axios";
import {formatMoney, RenderList, RenderListView} from "../constants/Functions";
import {Css} from "../constants/Css";

export default function main() {
  const [todayList, setTodayList] = React.useState([]);
  const [otherList, setOtherList] = React.useState([]);
  const [balance, setBalance] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const getList = () => {
    setIsLoading(true);
    Promise.all([axios.get('http://192.168.1.6:3000/list/today'),
      axios.get('http://192.168.1.6:3000/list/other'),
      axios.get('http://192.168.1.6:3000/list/balance')]).then(values => {
      setTodayList(values[0].data);
      setOtherList(values[1].data);
      setBalance(values[2].data?.balance);
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