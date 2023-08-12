import React, {useState, useEffect} from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Body() {
  const [images, setImages] = useState([
    "http://10.0.2.2:3000/api/images/public/slideshow/slide-1.jpg",
    "http://10.0.2.2:3000/api/images/public/slideshow/slide-2.jpg",
    "http://10.0.2.2:3000/api/images/public/slideshow/slide-3.jpg"
  ]);

  return (
    <View>
      <View style={styles.scrollview}>
        <Swiper loop autoplay autoplayTimeout={2.5} showsPagination={true}>
        {images.map((image, index) => (
            <ImageBackground key={index} style={styles.img} source={{ uri: image }}>
              <View/>
            </ImageBackground>
          ))}
        </Swiper>
        <View style={styles.line}/>    
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollview: {
    height:610,
    margin:0
  },
  img: {
    width: screenWidth,
    height: screenHeight,
  },
  line: {
    borderBottomWidth: 3,
    borderBottomColor: '#04A6DD',
    // Ajoutez une petite marge pour séparer la ligne du carrousel
  },
  zeromargin: {
    margin:0
  }
})