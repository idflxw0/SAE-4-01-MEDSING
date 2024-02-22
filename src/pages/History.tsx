import React,{ useState, useEffect } from 'react';
import {Text, View,StyleSheet,ScrollView} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Header from "../../Components/Header";
const History = ({ navigation,route }) => {
    const [historyData, setHistoryData] = useState(route.params?.history ?? []);

    useEffect(() => {
        if (route.params?.history) {
            setHistoryData(route.params.history);
        }
    }, [route.params?.history]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.fullScreen}
            />
            <View style={styles.header}>
                <Header title={"Histoire"} navigation={navigation}></Header>
            </View>
            <View style={styles.historyHeader}>
                <Text style={styles.headerItem}>Date</Text>
                <Text style={styles.headerItem}>Code CIP</Text>
                <Text style={styles.headerItem}>Nom</Text>
            </View>
            <ScrollView style={styles.historyScrollView}>
                {historyData.map((entry, index) => (
                    <View key={index} style={styles.historyEntry}>
                        <Text style={styles.historyItem}>{entry.date}</Text>
                        <Text style={styles.historyItem}>{entry.cipCode}</Text>
                        <Text style={styles.historyItem}>{entry.name}</Text>
                    </View>
                ))}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    fullScreen: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
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
});

export default History;