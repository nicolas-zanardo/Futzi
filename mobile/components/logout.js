import { useNavigation } from "@react-navigation/native";
import {StyleSheet, View, Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AuthContext } from "./authProvider";

export default function Logout() {
  const navigation = useNavigation();
  const {setToken, setUser} = useContext(AuthContext);

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      await AsyncStorage.removeItem('token');
      setToken(null);
      setUser(null);
      console.log("Déconnexion réussi !");
      navigation.navigate('login');
    } else {
      alert('Erreur lors de la déconnexion !')
    }
  }

  return(
    <View style={styles.space}>
      <Button title='Déconnexion' onPress={handleSubmit}/>
    </View>
  )
}


const styles = StyleSheet.create({
  space:{
    left:50
  }
})