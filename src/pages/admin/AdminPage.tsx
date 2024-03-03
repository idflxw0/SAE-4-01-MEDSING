import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AdminPage = () => {
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