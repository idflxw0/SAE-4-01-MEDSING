import React, {useEffect} from "react";
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';

const auth = getAuth();

const useAuth = () => {
    const [user, setUser] = React.useState<User>();

    useEffect(() => {
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                setUser(user)
            } else {
                // No user is signed in.
                setUser(undefined)
            }
        });
        return unsubscribeFromAuthStateChanged;
    }, []);
}

export default useAuth();