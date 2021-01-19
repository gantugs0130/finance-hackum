import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';
import CustomInput from "../components/CustomInput";
import {colors} from "../constants/Colors";
import axios from "axios";
import {backUrl} from "../constants/Functions";
import {useSelector} from "react-redux";
import {Formik, isInteger} from "formik";
import Toast from "react-native-toast-message";
import {setAuthGroup} from "../redux/actions/Auth";
import store from "../redux/store/configureStore";
import {CustomButton} from "../components/CustomButton";


export const GroupModal = ({setVisible, isChange = false}) => {
  const auth = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const btnText = isChange ? 'Бүлэг солих' : 'Бүлэг үүсгэх';
  return (
    <TouchableOpacity activeOpacity={1} style={styles.wrapper}>
      <Formik
        initialValues={{title: '', code: ''}}
        onSubmit={values => {
          setLoader(true);
          let reqUrl = '/group';
          if (isChange)
            reqUrl += '/change'
          axios.post(backUrl + reqUrl, {
            title: values.title,
            phone: auth.phone,
            code: values.code
          }).then(
            res => {
              if (res.data.code.toString() === '1') {
                store.dispatch(setAuthGroup(values.title));
                Toast.show({
                  type: 'success',
                  position: 'top',
                  text1: '',
                  text2: res.data.message,
                });
                setVisible(false);
              } else {
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: '',
                  text2: res.data.message,
                });
              }
              setLoader(false);
            },
            err => {
              console.log(err);
              setLoader(false);
            }
          )
        }}
        validate={(values) => {
          const errors = {};
          if (!values.code) {
            errors.code = 'Код заавал шаардлагатай.';
          }
          if (!values.title) {
            errors.title = 'Бүлэгийн нэр заавал шаардлагатай.';
          }
          return errors;
        }}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
          <View>
            <View style={styles.inputWrapper}>
              <CustomInput
                icon={'document-text-outline'}
                inputType={'default'}
                placeHolder={'Бүлэгийн нэр'}
                value={values.title}
                onBlur={handleBlur('title')}
                setText={handleChange('title')}
                hasError={errors.title && touched.title}
              />
              <CustomInput
                icon={'wallet-outline'}
                inputType={'default'}
                placeHolder={'Бүлэгийн нууц үг'}
                value={values.code}
                onBlur={handleBlur('code')}
                setText={handleChange('code')}
                hasError={errors.code && touched.code}
              />
            </View>
            <View style={styles.btnWrapper}>
              <CustomButton
                text={btnText}
                color={colors.white}
                isFilled={true}
                onClick={() => {
                  {
                    values.type = 0;
                    handleSubmit()
                  }
                }}
                disabled={loader}
              />
            </View>
          </View>)}
      </Formik>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 50,
    flex: .4,
    backgroundColor: colors.white
  },
  inputWrapper: {
    height: 115,
    justifyContent: 'space-between'
  },
  btnWrapper: {
    paddingTop: 50,
    justifyContent: 'flex-start'
  },
  btn: {
    paddingVertical: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    justifyContent: 'center',
    color: colors.white
  },
});