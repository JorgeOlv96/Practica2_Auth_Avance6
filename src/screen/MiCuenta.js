import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import Menu from "../components/Menu/Menu";


export default function MiCuenta() {
    const { user, logout } = useAuth();
  
    const logoutAlert = () => {
      Alert.alert(
        "Cerrar sesión",
        "¿Estas seguro de cerrar sesión?",
        [
          {
            text: "Cerrar sesion",
            onPress: () => logout(),
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ],
        {
           cancelable: false
           }
      );
    }
  
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text>
          {user.firstname && user.lastname
            ? `${user.firstname} ${user.lastname}`
            : user.email}
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <Menu />
        <Button onPress={logoutAlert}>Cerrar sesión</Button>
      </View>
    </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      textAlign: "center"
    },
    header: {
      backgroundColor: 'lightgray',
      padding: 20,
      textAlign: "center"
    },
    title: {
      color: 'green', // Establece el color del texto en verde
      fontSize: 24,
      textAlign: "center"
    },
    mainContainer: {
      padding: 20,
      textAlign: "center"
    },
  });