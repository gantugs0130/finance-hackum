import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from "../constants/Colors";
import {Css} from "../constants/Css";
import {CustomText} from "../components/CustomText";
import {IconWithButton} from "../components/IconWithButton";
import {CustomButton} from "../components/CustomButton";
import Modal from "react-native-modal";
import {GroupModal} from "../modals/GroupModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logOut} from '../redux/actions/Auth'
import rootStore from "../redux/store/configureStore";
import {useSelector} from "react-redux";
import ImagePicker from 'react-native-image-picker';

export const Profile = ({navigation}) => {
  const auth = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const hideModal = () => {
    setIsModalVisible(false);
  }

  const clickEditProfile = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      }
    };
    // ImagePicker.launchImageLibrary(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled photo picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     let source = { uri: response.uri };
    //
    //     // ADD THIS
    //     // setImageSource(source.uri);
    //   }
    // });
  }
  const clickEditPin = () => {
    console.log('edit pin');
  }
  const createGroup = () => {
    setIsChange(false);
    setIsModalVisible(true);
  }
  const changeGroup = () => {
    setIsChange(true);
    setIsModalVisible(true);
  }
  return (
    <View style={Css.container}>
      <Modal
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}
        animationIn={'slideInUp'}
        onBackdropPress={() => hideModal()}
        onSwipeComplete={() => hideModal()}
        swipeDirection="down"
        isVisible={isModalVisible}>
        <GroupModal setVisible={hideModal} isChange={isChange}/>
      </Modal>
      <View style={Css.headerWithLine}>
        <Text style={Css.inactiveText}>Профайл</Text>
      </View>
      <View style={styles.profileWrapper}>
        <View style={styles.profile}>
          <Text
            style={{color: colors.green, fontWeight: '800', fontSize: 24}}>{auth.phone.toString().substr(6, 2)}</Text>
          <View style={styles.editProfile}>
            <IconWithButton
              onPress={clickEditProfile}
              color={colors.white}
              backColor={colors.green} size={25}
              icon={'edit'}/>
          </View>
        </View>
        <View style={{flex: 1, paddingLeft: 16}}>
          <CustomText text={auth.phone} icon={'call-outline'}/>
        </View>
      </View>
      <View style={{position: 'relative'}}>
        <CustomText text={'****'} icon={'lock-closed-outline'}/>
        <View style={styles.editPin}>
          <IconWithButton
            onPress={clickEditPin}
            color={colors.white}
            backColor={colors.green}
            size={25}
            icon={'edit'}/>
        </View>
      </View>
      <View style={Css.headerWithLine}>
        <Text style={Css.inactiveText}>Бүлэг</Text>
      </View>
      <View style={styles.groupWrapper}>
        <CustomText text={auth.group || 'Одоогоор бүлэгт хамааралгүй байна.'} icon={'people-outline'}/>
        <View style={styles.groupButtons}>
          <CustomButton text={'Бүлэг үүсгэх'} color={colors.white30} onClick={createGroup}/>
          <CustomButton text={'Бүлэг солих'} color={colors.white30} onClick={changeGroup}/>
        </View>
      </View>
      <CustomButton text={'Системээс гарах'} isFilled={true} color={colors.white} onClick={() => {
        AsyncStorage.removeItem('phone');
        AsyncStorage.removeItem('group');
        rootStore.dispatch(logOut());
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    color: colors.red,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19
  },
  profileWrapper: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center'
  },
  profile: {
    position: 'relative',
    backgroundColor: colors.white20,
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfile: {
    position: 'absolute',
    right: -6,
    top: -6
  },
  editPin: {
    right: 24,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
  },
  groupWrapper: {
    paddingVertical: 15
  },
  groupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});