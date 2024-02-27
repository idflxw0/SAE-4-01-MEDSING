import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeUserSession = async (user) => {
    try {
        await AsyncStorage.setItem('userSession', JSON.stringify(user));
    } catch (error) {
        console.error('Failed to save user session:', error);
    }
};
export const checkUserSession = async () => {
    try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession !== null) {
            console.log('User session found:', JSON.parse(userSession));
            return true;
        } else {
            console.log('No user session found');
            return false;
        }
    } catch (error) {
        console.error('Failed to retrieve user session:', error);
        return false;
    }
};
export const clearUserSession = async () => {
    try {
        await AsyncStorage.removeItem('userSession');
        console.log('User session cleared successfully');
    } catch (error) {
        console.error('Failed to clear user session:', error);
    }
};

async function handleAppStartup({navigation}) {
    const isLoggedIn = await checkUserSession();
    if (isLoggedIn) {
        console.log("User is logged in, navigating to main screen");
        navigation.navigate('HomeScreen');
    } else {
        console.log("No user session, navigating to login screen");
        navigation.navigate('SignIn');
    }
}
