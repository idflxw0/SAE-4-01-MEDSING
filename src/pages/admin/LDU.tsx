import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import {LinearGradient} from "expo-linear-gradient";
import Header from "../../../Components/Header";
import {Ionicons} from "@expo/vector-icons";
import medsData from "../../../data/data.json";

const filter = require('../../../assets/filter.1024x1010.png');
const UsersPage: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [historyData, setHistoryData] = useState([]);
    const [isSortedByCount, setIsSortedByCount] = useState(false);
    const[isSortedByAlpha, setIsSortedByAlpha] = useState(false);
    const [usersCount, setUsersCount] = useState<number>(0);

    const handleFilterByAlph = () => {
        if (!isSortedByAlpha) {
            const sortedHistory = [...historyData].sort((a, b) => a.name.localeCompare(b.name));
            setHistoryData(sortedHistory);
        } else {
            fetchUsersData().then(r => 'data fetched.')
        }
        setIsSortedByAlpha(!isSortedByAlpha);
    };
    const handleFilterByNB = () => {
        if (!isSortedByCount) {
            const sortedHistory = [...historyData].sort((a, b) => b.count - a.count);
            setHistoryData(sortedHistory);
        } else {
            fetchUsersData().then(r => "history fetched");
        }
        setIsSortedByCount(!isSortedByCount);
    };

    const fetchUsersData = async () => {
        // First, fetch the users to get their names
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);

        // Process each user to find their medication count
        const usersMedsCountPromises = usersSnapshot.docs.map(async (userDoc) => {
            const userId = userDoc.id;
            const userName = userDoc.data().name;
            const userPfp = userDoc.data().profilePicture || null;

            // Now, find the corresponding userData document by userId
            const userDataDocRef = doc(db, "userData", userId);
            const userDataDocSnap = await getDoc(userDataDocRef);

            // Extract the user's medication history and count the entries
            const userHistory = userDataDocSnap.exists() ? userDataDocSnap.data().history || [] : [];
            const medsCount = userHistory.length;

            // Return an object containing the user's name and their med count
            return { name: userName, count: medsCount, pfp: userPfp };
        });

        Promise.all(usersMedsCountPromises).then(usersMedsCounts => {
            setHistoryData(usersMedsCounts);
        });
    };

    useEffect(() => {
        fetchUsersData();
    }, []);


    console.log(historyData)
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <View style={styles.header}>
                <Header title={"Liste des utilisateurs"} navigation={navigation}></Header>
            </View>
            <View style={styles.filtercontainer}>
                <Image source={filter} style={{width: 20, height: 20, marginRight: 10, marginLeft: 10,}}/>
                <Text style={{color: "#fff", fontWeight: "bold", fontSize: 15, marginRight: 10,}}>Filtrer</Text>
                <TouchableOpacity onPress={() => handleFilterByAlph()} style={styles.option}>
                    <Text style={styles.optionText}>Alphabétique</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterByNB()} style={styles.option}>
                    <Text style={styles.optionText}>Nombres Signalements</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.historyHeader}>
                <Text style={styles.headerItem}>Photo de profile</Text>
                <Text style={{marginRight:'8%',...styles.headerItem}}>Nom</Text>
                <Text style={styles.headerItem}>Nombres</Text>
            </View>
            <ScrollView style={styles.historyScrollView}>
                {historyData.map((userMedsCount, index) => (
                    <View key={index} style={styles.historyEntry}>
                        <Image source={{uri: userMedsCount.pfp}} style={{width: 50, height: 50, borderRadius: 50, marginRight: 10}}/>
                        <Text style={{right: -20, ...styles.historyItem}}>{userMedsCount.name}</Text>
                        <Text style={{ right : -20, ...styles.historyItem}}>{userMedsCount.count}</Text>
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
        marginTop: 10,
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
        width: "90%",
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
        height: "80%",
        marginLeft: 10,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
        backgroundColor: "#ffffff"
    },
    optionText: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default UsersPage;