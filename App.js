import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>MEDSING</Text>
      <Image source={require('./assets/MEDSING.png')} style={styles.Image}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    Text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#00BFFF'
  },
    Image: {
        width: 200,
        height: 200,
        margin: 10
    }

});
