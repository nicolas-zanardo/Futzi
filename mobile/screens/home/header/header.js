import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Header() {
    return (
        <View style={styles.footer}>
            <Image style={styles.img} source={require("../../assets/LOGO_OSNY.png")}/>
            <Image source={require("../../assets/userIcon.png")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    img: {
        width:106.5,
        height:67
    }
})