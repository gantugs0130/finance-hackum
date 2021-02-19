import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomInput from "../components/CustomInput";
import {CustomButton} from "../components/CustomButton";
import {colors} from "../constants/Colors";
import HeaderHackum from "../components/HeaderHackum";
import axios from "axios";
import {backUrl} from "../constants/Functions";
import {CustomPinCode} from "../components/CustomPinCode";
import {Formik} from "formik";
import Toast from "react-native-toast-message";

export const SignUp = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{phone: '', pin: '', pin2: ''}}
        onSubmit={values => {
          setLoader(true);
          axios.post(backUrl + '/user/signUp', {phone: values.phone, pin: values.pin}).then(
            res => {
              if (res.data.code === 1) {
                Toast.show({
                  type: 'success',
                  position: 'top',
                  text1: '',
                  text2: res.data.message
                });
                navigation.goBack();
              } else {
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: '',
                  text2: res.data.message
                });
              }
              setLoader(false);
            },
            error => {
              Toast.show({
                type: 'error',
                position: 'top',
                text1: '',
                text2: 'Бүртгэл амжилтгүй.'
              });
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
          } else if (values.pin.length !== 4) {
            errors.pin = 'Пин код 4 урттай байна';
          }
          if (!values.pin2) {
            errors.pin2 = 'Пин код заавал шаардлагатай.';
          } else if (values.pin !== values.pin2) {
            errors.pin2 = 'Пин код таарахгүй байна';
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
                           value={values.phone}
                           setText={handleChange('phone')}
                           onBlur={handleBlur('phone')}
                           hasError={errors.phone && touched.phone}
              />
              <CustomPinCode
                value={values.pin}
                setText={handleChange('pin')}
                icon={'lock-closed-outline'}
                onBlur={handleBlur('pin')}
                hasError={errors.pin}
              />
              <CustomPinCode
                value={values.pin2}
                setText={handleChange('pin2')}
                icon={'lock-closed-outline'}
                onBlur={handleBlur('pin2')}
                hasError={errors.pin2}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <CustomButton text={'Бүртгүүлэх'} color={colors.white} isFilled={true} onClick={handleSubmit}
                            disabled={loader}/>
            </View>
            <View style={{...styles.buttonWrapper, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{width: '50%'}}>
                <CustomButton text={'Буцах'} color={colors.white30} onClick={() => {
                  navigation.goBack();
                }}/>
              </View>
            </View>
          </View>
        )}
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
    height: 310,
    justifyContent: 'space-between',
    paddingVertical: 64
  },
  buttonWrapper: {
    justifyContent: 'flex-start'
  }
});