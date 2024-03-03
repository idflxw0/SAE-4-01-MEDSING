import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import {db} from "../../config/firebase";

const AdminPage = () => {
    const [usersData, setUsersData] = useState([]);
    const [medsCount, setMedsCount] = useState({});

    useEffect(() => {
        const fetchUsersData = async () => {
            const usersCollectionRef = collection(db, "userData");
            const usersSnapshot = await getDocs(usersCollectionRef);

            const usersData = usersSnapshot.docs.map(doc => doc.data());
            const medsCountMap = {};

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
    console.log(medsCount)
    return (
        <View style={styles.container}>
            <Text>
                THIS IS AN ADMIN PAGE
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AdminPage;