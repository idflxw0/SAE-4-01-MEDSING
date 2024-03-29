import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "../../../Components/Header";
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const megaphone = require('../../../assets/megaphone.1024x886.png');
const people = require('../../../assets/people.1024x825.png');

const AdminPage: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [medsCount, setMedsCount] = useState<{ [key: string]: number }>({});
    const [usersCount, setUsersCount] = useState<number>(0);
    const [signalCount, setSignalCount] = useState<number>(0);


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

    const abbreviateName = (name: string) => {
        const words = name.split(' ');
        if(words.length > 1) {
            return words.map(word => word[0].toUpperCase()).join('');
        }
        return name.length > 8 ? name.substr(0, 8) + '...' : name;
    };


    const chartData = {
        labels: Object.keys(medsCount).map(name => abbreviateName(name)),
        datasets: [
            {
                data: Object.values(medsCount),
            },
        ],
    };

    const chartWidth = screenWidth - 40;
    const chartConfig = {
        backgroundColor: '#fff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(100, 005, 205, ${opacity})`, // Using a nice cyan color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Labels are dark for better contrast
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        style: {
            borderRadius: 16,
            fontFamily: 'sans-serif',
        },
    };

    return (
    <View style={styles.container}>
        <LinearGradient
            colors={['#B7FFB1', '#FFE500']}
            style={styles.background}
        />
        <Header title={"Admin Dashboard"} navigation={navigation}></Header>
        <View style={styles.infoContainer}>
            <View style={[styles.infoItem, styles.infoItemFirst]}>
                <Image source={people} style={styles.infoImage} />
                <View>
                    <Text style={styles.infoText}>Nombre     d’utilisateurs</Text>
                    <Text style={styles.infoNumber}>{usersCount}</Text>
                </View>
            </View>
            <View style={[styles.infoItem, styles.infoItemSecond]}>
                <Image source={megaphone} style={styles.infoImage} />
                <View>
                    <Text style={styles.infoText}>Nombre de signalements</Text>
                    <Text style={styles.infoNumber}>{signalCount}</Text>
                </View>
            </View>
        </View>
        <Text style={styles.statsTitle}>Medications Usage Statistics:</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <BarChart
                data={chartData}
                width={chartWidth}
                height={300}
                chartConfig={chartConfig}
                fromZero={true}
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
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingLeft: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
        width: '45%',
    },

    infoText: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    infoNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    infoItemFirst: {
        marginRight: '2.5%', // Add right margin to the first item
        marginLeft: '2.5%', // Add left margin to the first item
    },
    infoItemSecond: {
        marginLeft: '2.5%', // Add left margin to the second item
        marginRight: '2.5%', // Add right margin to the first item
    },
    infoImage: {
        width: "45%",
        height: "95%",
        marginRight: 10,
        marginLeft: 0,
    },
});

export default AdminPage;
