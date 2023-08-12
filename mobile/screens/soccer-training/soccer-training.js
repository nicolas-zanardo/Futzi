import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './header/header'
import Body from './body/body'
import Footer from './footer/footer'

export default function SoccerTraining() {
  return (
    <View style={styles.Training}>
      <Header/>
      <Body/>
      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  Training:{
    margin: 5
  }
})
