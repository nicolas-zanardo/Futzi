import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './header/header';
import Body from './body/body';
import Footer from './footer/footer';

export default function Match() {
  return (
    <View style={styles.Match}>
      <Header/>
      <Body/>
      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  Match:{
    margin: 5
  }
})