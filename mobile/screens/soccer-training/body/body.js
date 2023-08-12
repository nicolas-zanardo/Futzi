import { useEffect, useState } from "react";
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.201.183:3000/api'
})

export default function Body() {
  const [entrainement, setEntrainement] = useState([]);

  const fetchTraining = async () => {

    try {
      const response = await axios.get("http://10.0.2.2:3000/api/training/all");
      setEntrainement(response.data);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTraining();
  }, []);

  return(
    <View>
      <ImageBackground style={styles.backgroundImage} source={require('../../assets/entrainement.jpg')}>
        <ScrollView>
          <View style={styles.center}>
            <Text style={styles.textTitle}>Entrainements</Text>
            <ScrollView horizontal={true}>
              <FlatList
                data={entrainement}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                  <View style={styles.training}>
                    <Text style={styles.textTitle}>{item.category}</Text>
                    <View style={styles.flex}>
                      <Text>{item.day} à {item.hour_start} au terrain {item.football_pitch}</Text>
                    </View>
                  </View>
                )}
              />
            </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.line}></View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    backgroundColor: "#04A6DD",
    color:'white',
    padding: 15,
    margin: 10,
    borderRadius: 15,
    textAlign:'center'
  },
  backgroundImage: {
    height: 615
  },
  center: {
    alignItems:'center',
    margin: 20
  },
  training: {
    backgroundColor:'white',
    opacity:0.85,
    borderRadius:10,
    margin: 10,
    padding: 10
  },
  textData: {
    opacity:1
  },
  flex: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  line: {
    borderBottomWidth:3,
    borderBottomColor: '#04A6DD',
  }
})