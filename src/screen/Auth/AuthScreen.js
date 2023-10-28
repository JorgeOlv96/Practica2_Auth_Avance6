import { View, Image, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { styles } from './AuthScreen.style'

import logo from '../../assets/images/logorym.png';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  const cambioAuth = () => {
    setIsLogin(!isLogin);
  }

  const showLogin = () => {
    setIsLogin(prenState => !prenState)
  }


  return (
    <View style={styles.cotainer}>
      <ImageBackground source={require('../../assets/img/fondo.jpg')} style={styles.fondo}>
      <Image style={styles.image} source={logo} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
        {isLogin ? <Login cambioAuth = { cambioAuth } showLogin = { showLogin } /> : <Register cambioAuth = { cambioAuth } showLogin = { showLogin }/>}
      </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
