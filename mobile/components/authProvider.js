import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = async (receivedToken) => {
    setToken(receivedToken);
    await getCurrentUser();
  };

  const getCurrentUser = async () => {
    axios.post("http://10.0.2.2:3000/api/auth/current-user", { token })
    .then(response => {
      setUser(response.data);
    })
    .catch(error => {
      console.error("Erreur lors de la requête:", error);
    });
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:3000/api/auth/refresh-token", {token});
      if (response.data && response.data.newToken) {
        setToken(response.data.newToken);
      }
    } catch (error) {
      console.error("Erreur lors de la rafraîchissement du token:", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      if (savedToken) {
        await handleLogin(savedToken);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    },5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentUser();
    };
  
    fetchData();
  }, [token]);
  

  return (
    <AuthContext.Provider value={{token, setToken, user, setUser, handleLogin}}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthProvider, AuthContext};