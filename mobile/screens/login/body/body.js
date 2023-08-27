import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../../components/authProvider";

export default function Body() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setToken} = useContext(AuthContext);
  
  const navigation = useNavigation();
  

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:3000/api/auth/login", {
        email: email,
        password: password
      });

      

      if (response.data && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        console.log("Connexion réussi !");
        navigation.navigate('home');
      } else {
        alert('Erreur lors de la connexion');
      }
    } catch (error) {
      alert('Erreur de connexion:', error.message);
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.blueLine} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Connexion</Text>
          <Icon name="lock" size={18} />
        </View>
        <View style={styles.blackLine} />
      </View>

      <View style={styles.inputContainer}>
        <Input
          label="Email"
          placeholder="email@address.com"
          onChangeText={setEmail}
          value={email}
          style={styles.inputStyle}
        />
        <Input
          label="Mot de passe"
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          style={styles.inputStyle}
        />
      </View>
      <Button title="Connectez vous" onPress={handleLogin} buttonStyle={styles.loginButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center'
  },
  headerContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#DCDCDC',
      borderWidth: 2,
      borderRadius: 10,
      width: 200,
      borderTopWidth:0,
      paddingTop: 2,
      borderBottomWidth:0,
      paddingBottom: 2
  },
  titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,  // Pour espacer du blueLine
      marginBottom: 10
  },
  title: {
      fontSize: 18,
      color: 'blue',
      marginRight: 20  // Modifié pour avoir un espacement plus approprié avec l'icône
  },
  loginButton: {
      backgroundColor: 'blue',
      width: 150,
      justifyContent: 'center',

  },
  blueLine: {
      width: '100%',
      borderBottomWidth: 8,
      borderBottomColor: '#04A6DD',
      marginBottom: 0,
      borderRadius: 10,
  },
  blackLine: {
    width: '100%',
    borderBottomWidth: 8,
    borderBottomColor: '#434343',
    marginBottom: 0,
    borderRadius: 10,
  },
  inputContainer: {
    width: 200, // La même largeur que headerContainer
    alignItems: 'center',
    borderColor: '#DCDCDC',
    borderWidth:2,
    borderRadius: 5,
    bottom:4
  },
  inputStyle: {
    width: '100%', // Utilise toute la largeur de son conteneur
  },  
});
