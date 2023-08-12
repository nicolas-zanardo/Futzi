import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './header/header';
import Body from './body/body';
import Footer from './footer/footer';

export default function Home() {
  return (
    <View style={styles.Home}>
        <Header/>
        <Body/>
        <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  Home: {
    margin:5
  }
})


