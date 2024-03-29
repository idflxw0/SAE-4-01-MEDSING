import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../Components/Header";
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import medsData from '../../../data/data.json';
const screenWidth = Dimensions.get('window').width;


const AdminPage: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [medsCountByCIP, setMedsCountByCIP] = useState<{ [key: string]: number }>({});

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
    
    const chartData = {
        labels: Object.keys(medsCountByCIP),
        datasets: [
            {
                data: Object.values(medsCountByCIP),
            },
        ],
    };

    const chartWidth = screenWidth - 40;
    const chartConfig = {
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Dark text for labels
        barPercentage: 0.7,
        style: {
            borderRadius: 16,
        },
        propsForBackgroundLines: {
            stroke: "none"
        },
    };

    return (
    <View style={styles.container}>
        <LinearGradient
            colors={['#B7FFB1', '#FFE500']}
            style={styles.background}
        />
        <Header title={"Admin Dashboard"} navigation={navigation}></Header>
        <Text style={styles.statsTitle}>Medications Usage Statistics:</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <BarChart
                data={chartData}
                width={chartWidth}
                height={300}
                chartConfig={chartConfig}
                fromZero={false}
                showBarTops={true}
                withInnerLines={true}
                yAxisLabel=""
                yAxisSuffix=""
                verticalLabelRotation={30}
            />
        </ScrollView>
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
    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

});

export default AdminPage;
