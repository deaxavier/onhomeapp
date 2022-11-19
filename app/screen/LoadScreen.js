import React, { useState, useEffect } from "react";
import * as Progress from 'react-native-progress';
import {
    KeyboardAvoidingView,
    View,
    Text,
    Image,
    StyleSheet,
    Alert
} from "react-native";
import { importClockEvents } from "../repository/events-repository";
import { importCustomer } from "../repository/customers-repositoty";
import { importPayments } from "../repository/payment-repository";
import { importUser } from "../repository/user-repository";
import { baseUrl } from "../helpers/consts";
import { importResume } from "../repository/resume_events-repository";
import { importClockEventsSevenDaysResume } from "../repository/resume_seven_days_events-repository";

export default function LoadScreen({ navigation, route }) {
    const [count, setCount] = useState(0.00)
    const [message, setMessage] = useState('Carregando informações do usuario')
    const token = route.params.token;
    useEffect(() => {
        setCount(0.00)
        getUserData()
    }, []);



    /**
     * Busca dados do Usuario
     */
    function getUserData() {
        fetch(baseUrl + 'user/info', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }).then((response) => {
            switch (response.status) {
                case 200:
                    response.text().then(function (user) {
                        recordUserData(user).then(() => {
                            updateProgress(0.2);
                            setMessage('Carregando informações do cliente')
                            getCustomerData();
                        })
                    });
                    break;
                default:
                    Alert.alert('OnHome', 'Ocorreu um erro ao buscar suas informações')
                    break;
            }
        })
    }

    /**
     * Busca dados do cliente
     */
    function getCustomerData() {
        fetch(baseUrl + 'customer/info', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }).then((response) => {
            switch (response.status) {
                case 200:
                    response.text().then(function (customer) {
                        recordCustomerData(customer).then(() => {
                            setMessage('Carregando Faturas')
                            updateProgress(0.4);
                            getPayments();
                        })
                    });
                    break;
                default:
                    Alert.alert('OnHome', 'Ocorreu um erro ao buscar suas informações')
                    break;
            }
        })
    }

    /**
     * Busca pagamentos
     */
    function getPayments() {
        fetch(baseUrl + 'payment', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }).then((response) => {
            switch (response.status) {
                case 200:
                    response.text().then(function (payments) {
                        recordPaymentData(payments).then(() => {
                            setMessage('Carregando dados da instalação')
                            updateProgress(0.6);
                            getClockRegisters();
                        })
                    });
                    break;
                default:
                    Alert.alert('OnHome', 'Ocorreu um erro ao buscar suas informações')
                    break;
            }
        })
    }

    /**
     * Busca registros do relógio
     */
    function getClockRegisters() {
        const to = new Date();
        const from = new Date(to.getFullYear(), to.getMonth(), to.getDate());
        const data = { "from": from, "to": to };
        const json = JSON.stringify(data);
        fetch(baseUrl + 'clock/events', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: json,
        }).then((response) => {
            switch (response.status) {
                case 200:
                    response.text().then(function (events) {
                        recordClockData(events).then(() => {
                            setMessage('Carregar resumo do relógio')
                            setCount(0.8)
                            getClockResumeSevenDays();
                        });
                    });
                    break;
                default:
                    Alert.alert('OnHome', 'Usuario ou senha inválidos\nVerifique seus dados e tente novamente')
                    break;
            }
        })
    }


    /**
     * Busca registros do relógio
     */
     function getClockResumeSevenDays() {
        const data = {};
        const json = JSON.stringify(data);
        fetch(baseUrl + 'clock/events-resume-seven-days', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: json,
        }).then((response) => {
            switch (response.status) {
                case 200:
                    response.text().then(function (resume) {
                        recordResumeDataSevenDays(resume).then(() => {
                            setMessage('Abrindo o Sistema')
                            setCount(0.80)
                            getClockResume();
                        });
                    });
                    break;
                default:
                    Alert.alert('OnHome', 'Não foi possivel carregar os dados do resumo de sete dias')
                    break;
            }
        })
    }


    /**
     * Busca registros do relógio
     */
    function getClockResume() {
        const data = {};
        const json = JSON.stringify(data);
        fetch(baseUrl + 'clock/events-resume', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: json,
        }).then((response) => {
            switch (response.status) {
                case 200:
                    response.text().then(function (resume) {
                        recordResumeData(resume).then(() => {
                            setMessage('Abrindo o Sistema')
                            setCount(1.00)
                            navigation.replace('HomeScreen');
                        });
                    });
                    break;
                default:
                    Alert.alert('OnHome', 'Usuario ou senha inválidos\nVerifique seus dados e tente novamente')
                    break;
            }
        })
    }

    /**
     * Atualiza progress bar
     * @param {*} value 
     */
    function updateProgress(value) {
        setCount(value)
    }

    /**
     * Gravar dados do usuario
     * @param {*} data 
     */
    async function recordUserData(data) {
        const user = JSON.parse(data);
        await importUser(user);
    }

    /**
     * Gravar dados do cliente
     * @param {*} data 
     */
    async function recordCustomerData(data) {
        const customer = JSON.parse(data);
        await importCustomer(customer);
    }

    /**
     * Gravar dados dos pagamentos
     * @param {*} data 
     */
    async function recordPaymentData(data) {
        const payments = JSON.parse(data);
        await importPayments(payments);
    }

    /**
     * Gravar eventos do relógio
     * @param {*} data 
     */
    async function recordClockData(data) {
        const events = JSON.parse(data);
        await importClockEvents(events);
    }

    /**
    * Gravar eventos do relógio
    * @param {*} data 
    */
    async function recordResumeData(data) {
        const resume = JSON.parse(data);
        await importResume(resume);
    }

    async function recordResumeDataSevenDays(data) {
        const resume = JSON.parse(data);
        await importClockEventsSevenDaysResume(resume);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.backgroud}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/electricity.png')}
                />
                <Text style={styles.text}>{message}</Text>
                <Progress.Bar style={styles.progress} progress={count} width={200} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    backgroud: {
        position: 'absolute',
        flex: 1,
        top: 0, left: 0,
        right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#333"
    },
    header: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        color: '#FFF'
    },
    progress: {
        top: 30
    },
    text: {
        color: "#FFF",
        top: 10
    }
});