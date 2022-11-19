import React, { useState, useEffect } from "react";

import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert
} from "react-native";

const UserScreen = ({ navigation, customer, user }) => {

    function onSignOut() {
        Alert.alert(
            "OnHome",
            "Deseja sair do app?",
            [
                {
                    text: "Não",
                    onPress: () => { },
                    style: "cancel"
                },
                { text: "SIM", onPress: () => navigation.replace("LoginScreen") }
            ]
        );
    }

    return (
        <View style={styles.background}>
            <Text style={styles.title}>Bem vindX</Text>
            <Text style={styles.customer_name}>{customer.NAME}</Text>
            <View style={styles.card_template}>
                <Text style={styles.customer_email}>{user.EMAIL}</Text>
                <Text style={styles.customer_address}>{customer.ADDRESS}, {customer.CITY} - {customer.STATE}</Text>
                <Text style={styles.customer_address}>{customer.ZIPCODE}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onSignOut}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEE",
    },
    info: {
        color: "#333",
        fontWeight: "900"
    },

    title: {
        fontSize: 30,
        fontWeight: "900",
        margin: 10,
        color: "#18A"
    },
    card_template: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 20,
        margin: 10,
    },
    customer_name: {
        fontSize: 20,
        fontWeight: "900",
        margin: 10,
        color: "#000",
    },
    customer_email: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000",
    }
    ,
    customer_address: {
        fontSize: 15,
        fontWeight: "300",
        color: "#000",
    },
    button: {
        backgroundColor: '#189',
        height: 45,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        top: 10,
        
    },
    buttonText: {
        color: '#FFF',
        fontWeight: "800",
        fontSize: 20
    },
});

export default UserScreen;