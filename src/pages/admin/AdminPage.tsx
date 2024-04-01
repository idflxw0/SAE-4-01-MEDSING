import React, { useEffect, useRef, useState } from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, processColor, Modal, FlatList} from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "../../../Components/Header";
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import medsData from '../../../data/data.json';
import DropDownPicker from 'react-native-dropdown-picker';


const megaphone = require('../../../assets/megaphone.1024x886.png');
const people = require('../../../assets/people.1024x825.png');
const list = require('../../../assets/cv.863x1024.png');
const people2 = require('../../../assets/persons.1024x924.png');
const AdminPage: React.FC<{ navigation: any }> = ({ navigation }) => {

    const [usersCount, setUsersCount] = useState<number>(0);
    const [signalCount, setSignalCount] = useState<number>(0);



    const handlelisteS = () => {
        navigation.navigate('LDS');
    }

    const handlelisteU = () => {
        navigation.navigate('LDU');
    }

    const fetchUsersCount = async () => {
        const usersCollectionRef = collection(db, "userData");
        const usersSnapshot = await getDocs(usersCollectionRef);
        setUsersCount(usersSnapshot.size);

    }
    usersCount === 0 && fetchUsersCount()
    console.log("users " + usersCount);


    return (
    <View style={styles.container}>
        <LinearGradient
            colors={['#B7FFB1', '#FFE500']}
            style={styles.background}
        />
        <Header title={"Admin Dashboard"} navigation={navigation}></Header>
        <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
                <Image source={people} style={styles.infoImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.infoText}>Nombre d'utilisateurs</Text>
                    <Text style={styles.infoNumber}>{usersCount}</Text>
                </View>
            </View>

            <View style={styles.infoItem}>
                <Image source={megaphone} style={styles.infoImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.infoText}>Nombre de signalements</Text>
                    <Text style={styles.infoNumber}>{signalCount}</Text>
                </View>
            </View>
        </View>
        <TouchableOpacity onPress={() => handlelisteS()} style={[styles.option, styles.option2]}>
            <Image source={list} style={styles.imgOption} />
            <Text style={styles.optionText}>Liste des signalements</Text>
            <Ionicons name="chevron-forward" size={16} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlelisteU()} style={styles.option}>
            <Image source={people2} style={styles.imgOption2} />
            <Text style={styles.optionText}>Liste des utilisateurs</Text>
            <Ionicons name="chevron-forward" size={16} color="black" />
        </TouchableOpacity>

    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        paddingTop: 50,
        paddingHorizontal: 20,
        width: '100%',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: '2%',
        paddingHorizontal: '3%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
        margin: 5, 
        minWidth: '48%',
        maxWidth: '48%',
    },
    infoText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5,
    },
    infoNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    infoImage: {
        width: 47,
        height: 40,
        marginRight: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: "8%",
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 30,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    option2: {
        marginTop: 50,
    },
    optionText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    imgOption: {
        width: "11%",
        height: "70%",
        marginRight: "3%",
        marginLeft: "3%",
    },
    imgOption2: {
        width: "15%",
        height: "70%",
        marginRight: "3%",
        marginLeft: "3%",
    },
});

export default AdminPage;
