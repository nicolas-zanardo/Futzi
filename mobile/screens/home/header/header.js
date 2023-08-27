import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import Logout from '../../../components/logout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {
    const [showButton, setShowButton] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const navigation = useNavigation();

    const handleLoginNavigation = () => {
        navigation.navigate('login');
    }

    const toggleButton = () => {
        setShowButton(prevState => !prevState);
    }

    const checkConnexion = async () => {
        const token = await AsyncStorage.getItem('token');
        setIsConnected(!!token);
    }

    useEffect(() => {
        checkConnexion();
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', checkConnexion);

        return () => {
            unsubscribe();
        };
    },[navigation])

    return (
        <View style={styles.header}>
            <Image style={styles.img} source={require("../../assets/LOGO_OSNY.png")}/>
            <View>
                <TouchableOpacity onPress={toggleButton}>
                    <Image source={require("../../assets/userIcon.png")}/>
                </TouchableOpacity>
                {showButton && (
                    <View style={styles.overlayButtonContainer}> 
                        {isConnected ? (
                            <Logout/>
                        ) : (
                            <View style={styles.space}><Button title='Connexion' onPress={handleLoginNavigation}/></View>
                        )}
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex: 2
    },
    img: {
        width:106.5,
        height:67
    },
    overlayButtonContainer: {
        position: 'absolute',
        top: 70,  // déplacez ceci pour ajuster la position verticale du bouton
        right: 200, // déplacez ceci pour ajuster la position horizontale du bouton
        zIndex: 3, // assurez-vous qu'il est au-dessus du reste du contenu
        width: 125,
        flexDirection:'row',
        
    },
    space:{
        right: 50
    }
})