import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";


export default function Footer() {
  const navigation = useNavigation();
  return(
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('home')}><Image source={require('../../assets/home_FILL1_wght100_GRAD0_opsz48.png')}/></TouchableOpacity>
      <TouchableOpacity><Image source={require('../../assets/sports_soccer_FILL0_wght100_GRAD0_opsz48.png')}/></TouchableOpacity>
      <TouchableOpacity><Image source={require('../../assets/directions_run_FILL1_wght100_GRAD0_opsz48.png')}/></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
      flexDirection:'row',
      justifyContent:'space-around'
  }
})