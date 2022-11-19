import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View
} from "react-native";
import { formatDate, formatNumber } from "../helpers/formaters";
import { getPayments } from "../repository/payment-repository";

const PaymentScreen = () => {
    const [payments, setPayments] = useState([{}])
    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const payments = await getPayments();
        setPayments(payments);
    }

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <Text style={styles.title}>Pagamentos</Text>
                {payments.map((payment, i) => {
                    return (
                        <View style={styles.card_template} key={i}>
                            <Text style={styles.payment_cost}>R$ {formatNumber(payment.COST)}</Text>
                            <Text style={styles.payment_status}>{payment.STATUS}</Text>
                            <Text style={styles.payment_date}>Vencimento: {formatDate(payment.DUE_DATE, 'D/MM/yyyy')}</Text>
                            <Text style={styles.payment_date}>Pago em: {formatDate(payment.PAYMENT_DATE, 'D/MM/yyyy')}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView >
    );
}

export default PaymentScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
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
    payment_cost: {
        fontSize: 25,
        fontWeight: "900",
        color: "#000",
    },
    payment_status: {
        fontSize: 18,
        fontWeight: "500",
        color: "#18A"
    },
    payment_date: {
        fontSize: 15,
        fontWeight: "300",
        color: "#000",
    }
});