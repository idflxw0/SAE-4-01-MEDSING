import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import {LinearGradient} from "expo-linear-gradient";
import Header from "../../../Components/Header";
import {Ionicons} from "@expo/vector-icons";
import medsData from "../../../data/data.json";

const filter = require('../../../assets/filter.1024x1010.png');
const UsersSignalsPage: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [historyData, setHistoryData] = useState([]);
    const [medsCountByCIP, setMedsCountByCIP] = useState<{ [key: string]: number }>({});

    const handleFilterByAlph = () => {
        const sortedHistory = [...historyData].sort((a, b) => a.name.localeCompare(b.name));
        setHistoryData(sortedHistory);
    };
    const handleFilterByNB = () => {
        const sortedHistory = [...historyData].sort((a, b) => a.date.localeCompare(b.date));
        setHistoryData(sortedHistory);
    }
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

    useEffect(() => {
        const fetchUsersData = async () => {
            const usersCollectionRef = collection(db, "userData");
            const usersSnapshot = await getDocs(usersCollectionRef);

            const usersData = usersSnapshot.docs.map(doc => doc.data());

            const medsNameToCIPMap = medsData.reduce((map, med) => {
                map[med.Name] = med.CIP;
                return map;
            }, {});

            const medsCountMap: { [key: string]: number } = {};
            usersData.forEach(user => {
                if (user.history) {
                    user.history.forEach(entry => {
                        // Use the name to get the CIP from the mapping
                        const cip = medsNameToCIPMap[entry.name];
                        if (cip) {
                            if (medsCountMap[cip]) {
                                medsCountMap[cip]++;
                            } else {
                                medsCountMap[cip] = 1;
                            }
                        }
                    });
                }
            });
            setMedsCountByCIP(medsCountMap);
        };
        fetchUsersData();
    }, []);

    const formatCIP = (cip: string) => {
        return '...' + cip.substr(cip.length - 9);
    };


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
                <Text style={styles.headerItem}>Code CIP</Text>
                <Text style={{marginRight:'8%',...styles.headerItem}}>Nom</Text>
                <Text style={styles.headerItem}>Nombres</Text>
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

export default UsersSignalsPage;
/*

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../../Components/Header';

const filter = require('../../../assets/filter.1024x1010.png');

const UsersSignalsPage = ({ navigation }) => {
    const [historyData, setHistoryData] = useState([]);
    const [medsCountByCIP, setMedsCountByCIP] = useState({});

    const fetchHistoryData = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const historyCollectionRef = collection(db, 'userData', user.uid, 'history');
                const historyQuery = query(historyCollectionRef, orderBy('name'));
                const querySnapshot = await getDocs(historyQuery);
                const history = querySnapshot.docs.map(doc => doc.data());
                setHistoryData(history);

                // Fetch medication data
                const medsData = await fetchMedicationData();

                // Map medication names to their corresponding CIP codes
                const medsNameToCIPMap = medsData.reduce((map, med) => {
                    map[med.Name] = med.CIP;
                    return map;
                }, {});

                // Count occurrences of each CIP code in user history data
                const medsCountMap = {};
                history.forEach(entry => {
                    const cip = medsNameToCIPMap[entry.name];
                    if (cip) {
                        medsCountMap[cip] = (medsCountMap[cip] || 0) + 1;
                    }
                });
                setMedsCountByCIP(medsCountMap);
            }
        } catch (error) {
            console.error('Error fetching history data:', error);
        }
    };

    const fetchMedicationData = async () => {
        // Fetch medication data from Firestore or any other source
        // Replace this with your actual data fetching logic
        const medsCollectionRef = collection(db, 'medications');
        const medsSnapshot = await getDocs(medsCollectionRef);
        return medsSnapshot.docs.map(doc => doc.data());
    };

    const handleFilterByAlph = () => {
        const sortedHistory = [...historyData].sort((a, b) => a.name.localeCompare(b.name));
        setHistoryData(sortedHistory);
    };

    const handleFilterByNB = () => {
        const sortedHistory = [...historyData].sort((a, b) => b.times - a.times);
        setHistoryData(sortedHistory);
    };

    useEffect(() => {
        fetchHistoryData();
    }, []);

    const formatCIP = (cip: string) => {
        return '...' + cip.substr(cip.length - 9);
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#B7FFB1', '#FFE500']} style={styles.background} />
            <View style={styles.header}>
                <Header title={'Liste Signalement'} navigation={navigation} />
            </View>
            <View style={styles.filtercontainer}>
                <Image source={filter} style={{ width: 20, height: 20, marginRight: 10, marginLeft: 10 }} />
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginRight: 10 }}>Filtrer</Text>
                <TouchableOpacity onPress={handleFilterByAlph} style={styles.option}>
                    <Text style={styles.optionText}>Alphabétique</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFilterByNB} style={styles.option}>
                    <Text style={styles.optionText}>Nombres Signalements</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.historyHeader}>
                <Text style={styles.headerItem}>Code CIP</Text>
                <Text style={{ marginRight: '8%', ...styles.headerItem }}>Nom</Text>
                <Text style={styles.headerItem}>Nombres</Text>
            </View>
            <ScrollView style={styles.historyScrollView}>
                {Object.entries(medsCountByCIP).map(([cip, count], index) => (
                    <View key={index} style={styles.historyEntry}>
                        <Text style={{ marginLeft: '-5%', ...styles.historyItem }}>{formatCIP(cip)}</Text>
                        <Text style={{ marginRight: '5%', ...styles.historyItem }}>{count}</Text>
                        <Text style={styles.historyItem}>{medsCountByCIP[cip]}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
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
    filtercontainer: {
        marginHorizontal: 20,
        marginBottom: 10,
        backgroundColor: '#689FF7',
        height: 50,
        width: '90%',
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
        height: '80%',
        marginLeft: 10,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
    },
    optionText: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default UsersSignalsPage;
*/
