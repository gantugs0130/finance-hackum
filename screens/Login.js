import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomInput from "../components/CustomInput";
import {CustomButton} from "../components/CustomButton";
import {colors} from "../constants/Colors";
import HeaderHackum from "../components/HeaderHackum";
import {CustomPinCode} from "../components/CustomPinCode";
import axios from "axios";
import {backUrl} from "../constants/Functions";
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLoginState} from '../redux/actions/Auth'
import rootStore from "../redux/store/configureStore";


export const Login = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const signUp = () => {
    navigation.navigate('SignUp');
  }
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{phone: '', pin: ''}}
        onSubmit={values => {
          setLoader(true);
          axios.post(backUrl + '/user/login', {phone: values.phone, pin: values.pin}).then(
            res => {
              if (res.data.code.toString() === '1') {
                AsyncStorage.setItem('phone', `${values.phone}`);
                if (res.data.group) {
                  AsyncStorage.setItem('group', `${res.data.group}`);
                }
                rootStore.dispatch(setLoginState({phone: values.phone, group: res.data.group || ''}));
              } else {
                if (res.data.code.toString() === '0') {
                  Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: '',
                    text2: res.data.message,
                  });
                }
              }
              setLoader(false);
            }
          )
        }}
        validate={(values) => {
          const errors = {};
          if (!values.phone) {
            errors.phone = 'Утасны дугаар заавал шаардлагатай.';
          } else if (values.phone.length !== 8) {
            errors.phone = 'Утасны дугаар буруу байна.';
          }
          if (!values.pin) {
            errors.pin = 'Пин код заавал шаардлагатай.';
          }
          return errors;
        }}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
          <View>
            <View style={styles.inputWrapper}>
              <CustomInput inputType={'phone-pad'}
                           placeHolder={'Утасны дугаар'}
                           icon={'call-outline'}
                           setText={handleChange('phone')}
                           onBlur={handleBlur('phone')}
                           value={values.phone}
                           hasError={errors.phone && touched.phone}
              />
              <CustomPinCode value={values.pin}
                             setText={handleChange('pin')}
                             icon={'lock-closed-outline'}
                             hasError={errors.pin}/>
            </View>
            <View style={styles.buttonWrapper}>
              <CustomButton
                text={'Нэвтрэх'}
                color={colors.white}
                isFilled={true}
                onClick={handleSubmit}
                disabled={loader}
              />
              <View style={{...styles.buttonWrapper, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: '50%'}}>
                  <CustomButton
                    text={'Бүртгүүлэх'}
                    color={colors.white30}
                    onClick={signUp}/>
                </View>
              </View>
            </View>
          </View>)}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 25
  },
  inputWrapper: {
    height: 243,
    justifyContent: 'space-between',
    paddingVertical: 64
  },
  buttonWrapper: {
    justifyContent: 'flex-start'
  },
});