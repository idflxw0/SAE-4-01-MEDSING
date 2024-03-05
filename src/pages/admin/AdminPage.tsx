import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from "@expo/vector-icons";

const AdminPage: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [medsCount, setMedsCount] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchUsersData = async () => {
            const usersCollectionRef = collection(db, "userData");
            const usersSnapshot = await getDocs(usersCollectionRef);

            const usersData = usersSnapshot.docs.map(doc => doc.data());
            const medsCountMap: { [key: string]: number } = {};

            usersData.forEach(user => {
                if (user.history) {
                    user.history.forEach(entry => {
                        if (medsCountMap[entry.name]) {
                            medsCountMap[entry.name]++;
                        } else {
                            medsCountMap[entry.name] = 1;
                        }
                    });
                }
            });
            setMedsCount(medsCountMap);
        };
        fetchUsersData();
    }, []);

    const chartData = {
        labels: Object.keys(medsCount).map(() => ''),
        datasets: [
            {
                data: Object.values(medsCount),
            },
        ],
    };

    return (
        <LinearGradient
            colors={['#B7FFB1', '#FFE500']}
            style={styles.background}
        >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Admin Dashboard</Text>

            <View style={styles.container}>
                <Text style={styles.statsTitle}>Medications Usage Statistics:</Text>
                <LineChart
                    data={chartData}
                    width={300}
                    height={200}
                      yAxisSuffix=" times"
                    chartConfig={{
                        backgroundColor: '#FFFFFF',
                        backgroundGradientFrom: '#FFFFFF',
                        backgroundGradientTo: '#FFFFFF',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    backButton: {
        position: 'absolute',
        top: '3%',
        left: '3%',
        marginTop: '5%',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default AdminPage;
