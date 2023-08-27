import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image style={styles.img} source={require("../../assets/LOGO_OSNY.png")}/>
      <Image source={require("../../assets/userIcon.png")}/>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  img: {
    width:106.5,
    height:67
}
})