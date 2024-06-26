import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from "./src/pages/SplashScreen";
import HomeScreen from "./src/pages/HomeScreen";

import SettingsScreen from "./src/pages/reglage";
import LanguageScreen from "./src/pages/reglage page/language";
import ThemeScreen from "./src/pages/reglage page/theme";
import NotificationScreen from "./src/pages/reglage page/notification";
import AboutScreen from "./src/pages/reglage page/about";
import HelpScreen from "./src/pages/reglage page/help";
import History from "./src/pages/History";
import {LanguageProvider} from "./Components/LanguageContext";
import ConfirmationPage from "./src/pages/ConfirmationPage";

import SignInScreen from "./src/pages/LandingPages/ConnectingPage/SignInScreen";
import SignUpScreen from "./src/pages/LandingPages/ConnectingPage/SignUp";
import ResetConfirmation from "./src/pages/LandingPages/PasswordManagementPages/ResetConfirmation";
import PasswordReset from "./src/pages/LandingPages/PasswordManagementPages/PasswordReset";
import ForgotPassword from "./src/pages/LandingPages/PasswordManagementPages/ForgotPassword";
import OnboardingScreen from "./src/pages/LandingPages/LandingPage";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';

import AdminPage from "./src/pages/admin/AdminPage";
import UsersSignalsPage from "./src/pages/admin/LDS";
import ModifProfile from "./src/pages/ModifProfile";
import TermsScreen from "./src/pages/LandingPages/components/TermsScreen";
import UsersPage from "./src/pages/admin/LDU";

const Stack = createStackNavigator();
export default function App() {
    /*useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            console.log(auth)
            if (user) {
                console.log('User is signed in:', user);
            } else {
                console.log('No user is signed in');
            }
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, []);*/
    const [initializing, setInitializing] = React.useState(true);
    const [user, setUser] = React.useState(null);

    function onAuthStateChanged(user: React.SetStateAction<null>) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        //@ts-ignore
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    if (initializing) return null;

    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">

              <Stack.Screen name="Landing" component={OnboardingScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
              <Stack.Screen name="ResetConfirmation" component={ResetConfirmation} options={{ headerShown: false }}/>
              <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown: false }}/>
              <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }}/>

              <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
              <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} options={{ headerShown: false }} />

              <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Theme" component={ThemeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
              <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Admin" component={AdminPage} options={{ headerShown: false }} />
              <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }} />
              <Stack.Screen name="LDS" component={UsersSignalsPage} options={{ headerShown: false }} />
              <Stack.Screen name={"LDU"} component={UsersPage} options={{ headerShown: false }} />
              <Stack.Screen name="ModifyProfile" component={ModifProfile} options={{ headerShown: false }} />
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
