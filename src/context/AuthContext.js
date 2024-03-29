import React, { useState, useEffect, createContext } from 'react';
import { storageController } from '../api/token';
import { userController } from '../../src/api/users';
import { tokenExpired } from '../util/tokenExpired';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Agregar el estado para el token

  // Comprobar si existe el token en AsyncStorage
  useEffect(() => {
    getSeccion();
  }, []);

  const getSeccion = async () => {
    const storedToken = await storageController.getToken();
    if (!storedToken) {
      logout();
      setLoading(false);
      return;
    }
    if (tokenExpired(storedToken)) {
      logout();
    } else {
      // Guardar el token en el estado
      setToken(storedToken);
      login(storedToken);
    }
  }

  const login = async (authToken) => {
    try {
      await storageController.setToken(authToken);
      const response = await userController.getMe();
      setUser(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const logout = async () => {
    try {
      // Remover el token del estado y del almacenamiento
      setToken(null);
      await storageController.removeToken();
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const upDateUser = (key, value) => {
    setUser({
      ...user,
      [key]: value
    })
  }

  // Esta es una función para obtener el ID del usuario logueado
  const getLoggedInUserId = () => {
    return user ? user.id : null;
  }

  const data = {
    user,
    token, // Proporcionar el token en el archivo de authContext de la carpeta context
    login,
    logout,
    upDateUser,
    getLoggedInUserId,
  }

  if (loading) return null;

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};
