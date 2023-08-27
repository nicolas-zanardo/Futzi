import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';

export default function Body() {
  const [match, setMatch] = useState([]);

  const fetchMatch = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get("http://10.0.2.2:3000/api/match-play/get-all", {
        headers: {
          'Authorization': `${token}`
        }
      });
      setMatch(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMatch();
  },[])

  return (
    <View>
      
    </View>
  )
}