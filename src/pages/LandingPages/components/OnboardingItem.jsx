import React from 'react';
import {View, StyleSheet, Text, FlatList, useWindowDimensions, Image} from "react-native";

const OnboardingItem = ({item,isFirst}) => {
    const {width} = useWindowDimensions();
    const TextStyle = () => {
        return isFirst ? styles.firstTitle : styles.otherTitles;
    }
    return(
        <View style ={[styles.container, {width}]}>
            <Image source={item.image} style={[styles.images, {width, resizeMode : 'contain',marginBottom: -20, marginTop : 20}]}/>
            <View style={{flex : 0.50}}>
                <Text style={TextStyle()}>{item.title}</Text>
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
        flex : 0.6,
        justifyContent : 'center',
    },
    firstTitle: {
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
        marginTop: "-1%",
        margin: 20,
        paddingHorizontal: "5%",

    },
    otherTitles: {
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: '-3%',
        marginTop: '-10%',
        paddingHorizontal: 20,
    },
    description : {
      fontWeight : '300',
      color : '#90909F',
      fontSize: 16,
      padding : 12,
      textAlign: 'center',
        marginTop: '2%',
      marginBottom: '5%',
      paddingHorizontal : 10,
    }
})
export default OnboardingItem;