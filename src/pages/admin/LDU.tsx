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
        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);

        const usersData = usersSnapshot.docs.map((doc) => doc.data());

        const medsNameToCIPMap = medsData.reduce((map, med) => {
            map[med.Name] = med.CIP;
            return map;
        }, {});

        const medsCountMap = {};
        usersData.forEach((user) => {
            if (user.history) {
                user.history.forEach((entry) => {
                    const cip = medsNameToCIPMap[entry.name];
                    if (cip) {
                        medsCountMap[cip] = (medsCountMap[cip] || 0) + 1;
                    }
                });
            }
        });

        const medsCountArray = Object.entries(medsCountMap).map(([cip, count]) => {
            const cipAsString = String(cip);
            const medName = medsData.find((med) => String(med.CIP) === cipAsString)?.Name || '';
            return {
                cipCode: cip,
                name: medName,
                count: count,
            };
        });
        setHistoryData(medsCountArray);
    };

    useEffect(() => {
        fetchUsersData();
    }, []);

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
                <Text style={styles.headerItem}>Nom</Text>
                <Text style={{marginRight:'8%',...styles.headerItem}}></Text>
                <Text style={styles.headerItem}>Nombres</Text>
            </View>
            <ScrollView style={styles.historyScrollView}>
                {historyData.map((entry, index) => (
                    <View key={index} style={styles.historyEntry}>
                        <Text style={{marginLeft:'-5%', ...styles.historyItem}}>{entry.cipCode}</Text>
                        <Text style={{marginRight:'-10%', ...styles.historyItem}}>{entry.name}</Text>
                        <Text style={{ right : -20, ...styles.historyItem}}>{entry.count}</Text>
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