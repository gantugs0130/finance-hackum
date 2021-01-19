import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';
import CustomInput from "../components/CustomInput";
import {colors} from "../constants/Colors";
import axios from "axios";
import {backUrl} from "../constants/Functions";
import {useSelector} from "react-redux";
import {Formik, isInteger} from "formik";
import Toast from "react-native-toast-message";
import {CustomButton} from "../components/CustomButton";


export const AddTransactionModal = ({setVisible}) => {
  const auth = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  return (
    <TouchableOpacity activeOpacity={1} style={styles.wrapper}>
      <Formik
        initialValues={{title: '', amount: '', type: 0}}
        onSubmit={values => {
          setLoader(true);
          axios.post(backUrl + '/list', {
            amount: values.amount,
            title: values.title,
            type: values.type,
            phone: auth.phone,
            group: auth.group
          }).then(
            res => {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: '',
                text2: res.data.message,
              });
              setLoader(false);
              setVisible(false);
            }
          )
        }}
        validate={(values) => {
          const errors = {};
          if (!values.amount) {
            errors.amount = 'Үнийн дүн заавал шаардлагатай.';
          } else if (!isInteger(values.amount)) {
            errors.amount = 'Үнийн дүн буруу байна.';
          }
          if (!values.title) {
            errors.title = 'Тайлбар заавал шаардлагатай.';
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
                placeHolder={'Тайлбар'}
                value={values.title}
                onBlur={handleBlur('title')}
                setText={handleChange('title')}
                hasError={errors.title && touched.title}
              />
              <CustomInput
                icon={'wallet-outline'}
                inputType={'decimal-pad'}
                placeHolder={'Мөнгөн дүн'}
                value={values.amount}
                onBlur={handleBlur('amount')}
                setText={handleChange('amount')}
                hasError={errors.amount && touched.amount}
              />
            </View>
            <View style={styles.btnWrapper}>
              <View style={{flex: .3}}>
                <CustomButton
                  bgColor={colors.red}
                  text={'Зарлага'}
                  color={colors.white}
                  isFilled={true}
                  onClick={() => {
                    {
                      values.type = 1;
                      handleSubmit()
                    }
                  }}
                  disabled={loader}
                />
              </View>
              <View style={{flex: .3}}>
                <CustomButton
                  text={'Орлого'}
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
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btn: {
    paddingVertical: 16,
    width: '40%',
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