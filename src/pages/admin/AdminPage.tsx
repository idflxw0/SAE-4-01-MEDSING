import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, processColor} from 'react-native';
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
const AdminPage: React.FC<{ navigation: any }> = ({ navigation }) => {

    const [medsCountByCIP, setMedsCountByCIP] = useState<{ [key: string]: number }>({});

    const [usersCount, setUsersCount] = useState<number>(0);
    const [signalCount, setSignalCount] = useState<number>(0);
    const screenWidth = Dimensions.get('window').width;
    const [month, setMonth] = useState('janvier');
    const [selectedDate, setSelectedDate] = useState(null);

    const days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
    const dates = ['01', '02', '03', '04', '05', '06', '07'];


    const handleliste = () => {
        navigation.navigate('LDH');
    }

    const fetchSignalCount = async () => {
        const signalCollectionRef = collection(db, "signalData");
        const signalSnapshot = await getDocs(signalCollectionRef);
        setSignalCount(signalSnapshot.size);

    }
    signalCount === 0 && fetchSignalCount()
    console.log("signal " + signalCount);
    const fetchUsersCount = async () => {
        const usersCollectionRef = collection(db, "userData");
        const usersSnapshot = await getDocs(usersCollectionRef);
        setUsersCount(usersSnapshot.size);

    }
    usersCount === 0 && fetchUsersCount()
    console.log("users " + usersCount);


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
    const selectDate = (date) => {
        setSelectedDate(date);
    };
    const calculateChartWidth = (dataLength: number) => {
        const baseWidth = screenWidth - 40; // Base width for a single item
        const itemWidth = 80; // Desired width per item in the chart
        return dataLength * itemWidth > baseWidth ? dataLength * itemWidth : baseWidth;
    };

    const chartData = {
        labels: Object.keys(medsCountByCIP).map(cip => formatCIP(cip)),
        datasets: [
            {
                data: Object.values(medsCountByCIP),
            },
        ],
    };
    
    const dynamicChartWidth = calculateChartWidth(Object.keys(medsCountByCIP).length);
    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0, // ne pas afficher les décimales
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
        }
    };

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

        <View style={styles.header}>
            <Text style={styles.detailsText}>Details Signalements</Text>

            <View style={styles.dateRow}>
                <TouchableOpacity style={styles.chevron}>
                    <Ionicons name="chevron-back-outline" size={16} color="black" />
                </TouchableOpacity>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {days.map((day, index) => (
                        <TouchableOpacity
                            key={day}
                            style={[
                                styles.dateContainer,
                                selectedDate === dates[index] ? styles.selectedDateContainer : null,
                            ]}
                            onPress={() => selectDate(dates[index])}
                        >
                            <Text style={styles.day}>{day}</Text>
                            <Text style={styles.date}>{dates[index]}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.chevron}>
                    <Ionicons name="chevron-forward-outline" size={16} color="black" />
                </TouchableOpacity>
            </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <BarChart
                data={chartData}
                width={dynamicChartWidth}
                height={300}
                chartConfig={chartConfig}
                fromZero={true}
                withInnerLines={true}
                showBarTops={true}
                yAxisLabel=""
                yAxisSuffix=""
                verticalLabelRotation={30}
            />
        </ScrollView>
        <TouchableOpacity onPress={() => handleliste()} style={styles.option}>
            <Image source={list} style={styles.imgOption} />
            <Text style={styles.optionText}>Liste signalement</Text>
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
    chart: {
        flex: 1
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },

    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
        marginBottom: 100,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F0F4F7',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    detailsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    chevron: {
        padding: 8,
    },
    scrollViewContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateContainer: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    selectedDateContainer: {
        backgroundColor: 'darkblue', // Highlight color for the selected date
    },
    day: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AdminPage;
