import React from 'react';
import {View, StyleSheet, Text, FlatList, useWindowDimensions, Image} from "react-native";

const OnboardingItem = ({item}) => {
    const {width} = useWindowDimensions();
    return(

        <View style ={[styles.container, {width}]}>
            <Image source={item.image} style={[styles.images, {width, resizeMode : 'contain',marginBottom: -20, marginTop : 20}]}/>
            <View style={{flex : 0.65}}>
                <Text  style = {styles.title}>{item.title}</Text>
                <Text style = {styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    image : {
        flex : 0.7,
        justifyContent : 'center',
    },
    title :{
        fontSize : 32,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        paddingHorizontal : 50,

    },
    description : {

      fontWeight : '300',
      color : '#90909F',
      fontSize: 16,
      padding : 12,
      textAlign: 'center',
      marginBottom: 30,
      paddingHorizontal : 25,
    }
})
export default OnboardingItem;