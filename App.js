import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from "./src/pages/SplashScreen";
export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
              <Stack.Screen name="SplashScreen" component={SplashScreen}></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
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
