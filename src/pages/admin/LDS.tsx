import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import {LinearGradient} from "expo-linear-gradient";
import Header from "../../../Components/Header";
import {Ionicons} from "@expo/vector-icons";

const filter = require('../../../assets/filter.1024x1010.png');
const UsersSignalsPage: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        const fetchHistoryData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "userData", user.uid);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.history) {
                        const reversedHistory = [...userData.history].reverse();
                        setHistoryData(reversedHistory);
                    }
                } else {
                    console.log("No such document!");
                }
            }
        };
        fetchHistoryData();
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <View style={styles.header}>
                <Header title={"Liste Signalement"} navigation={navigation}></Header>
            </View>
            <View style={styles.filtercontainer}>
                <Image source={filter} style={{width: 30, height: 30, marginRight: 10,}}/>
                <Text style={{color: "#fff", fontWeight: "bold", fontSize: 20}}>Filtrer</Text>
                <TouchableOpacity onPress={() => handleliste()} style={styles.option}>
                    <Image source={list} style={styles.imgOption} />
                    <Text style={styles.optionText}>Liste signalement</Text>
                    <Ionicons name="chevron-forward" size={16} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.historyHeader}>
                <Text style={styles.headerItem}>Date</Text>
                <Text style={{marginRight:'8%',...styles.headerItem}}>Code CIP</Text>
                <Text style={styles.headerItem}>Nom</Text>
            </View>
            <ScrollView style={styles.historyScrollView}>
                {historyData.map((entry, index) => (
                    <View key={index} style={styles.historyEntry}>
                        <Text style={{marginLeft:'-5%', ...styles.historyItem}}>{entry.date}</Text>
                        <Text style={{marginRight:'5%', ...styles.historyItem}}>{entry.cipCode}</Text>
                        <Text style={styles.historyItem}>{entry.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 20,
    },
    entry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: '2%',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
    },
    item: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    header: {
        width: '100%',
        marginTop: '10%',
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: '5%',
        marginHorizontal: 10,
    },
    historyScrollView: {
        width: '100%',
        paddingHorizontal: 20,
    },
    historyEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: '2%',
        backgroundColor: '#FFFFFF',
        // Add shadows for iOS
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // Add elevation for Android
        elevation: 1,
    },
    headerItem: {
        flex: 1,
        color: '#7C7272',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    historyItem: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    historyItemCIP: {
        marginRight: 2,
    },
    filtercontainer: {
        marginHorizontal: 20,
        marginBottom: 10,
        backgroundColor: "#689FF7",
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
});

export default UsersSignalsPage;