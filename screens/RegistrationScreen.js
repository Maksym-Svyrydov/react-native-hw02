import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function RegisterForm() {
  const initialState = {
    name: '',
    email: '',
    password: '',
  };
  const defaultAvatar = null;
  const [user, setUser] = useState(initialState);
  const [image, setImage] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const addAvatar = async (e) => {
    if (!image) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.uri);
      }
    } else {
      setImage(null);
    }
  };
  const submit = (e) => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(user);
    setUser(initialState);
    setImage(null);
  };
  const link = '';
  const openLink = () => Linking.openURL(link);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...styles.container, flex: isShowKeyboard ? 0.6 : 0.6 }}>
        <View style={styles.innerContainer}>
          <View style={styles.avatarWrapper}>
            <TouchableOpacity onPress={addAvatar}>
              {image && (
                <Image
                  src={image}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
              )}
              {!image && (
                <Image
                  fadeDuration={0}
                  style={styles.avatarDefault}
                  source={require('../img/addicon.png')}
                />
              )}
              {image && (
                <Image
                  fadeDuration={0}
                  style={{ ...styles.removeIcon }}
                  source={require('../img/removeicon.png')}
                />
              )}
            </TouchableOpacity>
          </View>
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
          <TouchableOpacity style={styles.linkWrapper} onPress={openLink}>
            <Text style={styles.link}>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
    // alignItems: 'center',
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
  avatarWrapper: {
    position: 'absolute',
    top: -90,
    borderRadius: 16,
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    zIndex: 1,
    marginHorizontal: 130,
  },
  avatarDefault: {
    position: 'absolute',
    top: 90,
    right: -10,
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  removeIcon: {
    position: 'absolute',
    top: 86,
    right: -17,
    width: 37,
    height: 37,
    resizeMode: 'cover',
  },
  titleWrapper: {
    // alignItems: 'center',
    marginTop: 92,
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
