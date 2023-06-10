import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
const initialState = {
  name: '',
  email: '',
  password: '',
};
export default function RegisterForm() {
  const [user, setUser] = useState(initialState);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const submit = (e) => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(user);
    setUser(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...styles.container, flex: isShowKeyboard ? 0.7 : 0.7 }}>
        <View style={styles.innerContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Реєстрація</Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.inputWrapper}>
              <TextInput
                value={user.name}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, name: value }))
                }
                placeholder="Логін"
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
              />
              <TextInput
                value={user.email}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, email: value }))
                }
                placeholder="Адреса електронної пошти"
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
              />
              <TextInput
                value={user.password}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, password: value }))
                }
                placeholder="Пароль"
                secureTextEntry={true}
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.buttonWrapper}
              onPress={submit}
            >
              <Text style={styles.btnText}>Зареєстуватися</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <TouchableWithoutFeedback style={styles.linkWrapper}>
            <Text style={styles.link}>Вже є акаунт? Увійти</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    position: 'relative',
    justifyContent: 'flex-end',
    // alignItems: '',
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    paddingBottom: 43,
    gap: 16,
  },
  titleWrapper: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    fontSize: 30,
    color: '#212121',
  },
  inputWrapper: {
    marginBottom: 42,
    marginTop: 32,
  },

  input: {
    padding: 10,
    color: '#BDBDBD',
    marginBottom: 10,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
  buttonWrapper: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginBottom: 16,
  },

  btnText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },

  linkWrapper: {},
  link: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
});
