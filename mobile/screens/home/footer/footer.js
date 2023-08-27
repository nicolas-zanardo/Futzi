import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Footer() {
    const navigation = useNavigation();
    return (
        <View style={styles.footer}>
            <TouchableOpacity>
                <Image source={require('../../assets/home_FILL1_wght100_GRAD0_opsz48.png')}/>
            </TouchableOpacity>
            <View style={styles.VerticalLine}></View>
            <TouchableOpacity onPress={() => navigation.navigate('match')}>
                <Image source={require('../../assets/sports_soccer_FILL0_wght100_GRAD0_opsz48.png')}/>
            </TouchableOpacity>
            <View style={styles.VerticalLine}></View>
            <TouchableOpacity onPress={() => navigation.navigate('soccer-training')}>
                <Image source={require('../../assets/directions_run_FILL1_wght100_GRAD0_opsz48.png')}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection:'row',
        justifyContent:'space-around',
    },
    VerticalLine: {
        height:'100%',
        width:1,
        backgroundColor: '#D3D3D3'
    },
    center: {
        textAlign:'center'
    }
})