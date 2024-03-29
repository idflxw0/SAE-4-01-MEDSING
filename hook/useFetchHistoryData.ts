import React, {useState} from 'react';
import {auth, db} from "../src/config/firebase";
import {doc, getDoc} from "firebase/firestore";

const useFetchHistoryData = () => {
    const [historyData, setHistoryData] = useState([]);
    const fetchHistoryData = async (setHistoryData) => {
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
    return { historyData, fetchHistoryData };
};


export default useFetchHistoryData;