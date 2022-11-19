import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { formatDate, formatNumber } from "../helpers/formaters";
import { getEvents } from "../repository/events-repository";
import { getResume } from "../repository/resume_events-repository";
import { getEventsSevenDaysResume } from "../repository/resume_seven_days_events-repository";

const EventsScreen = () => {
    const [data, setData] = useState([{}])
    const [eventsToday, setEventsToday] = useState([{}])
    const [eventsSevenDays, setEventsSevenDays] = useState([{}])
    const [format, setFormat] = useState('DD/MM/YYYY HH:mm')
    const [resume, setResume] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getData();
    }, [])

    function setDayEvents() {
        setFormat('HH:mm');
        setData(eventsToday);
    }

    function setWeekEvents() {
        setFormat('DD/MM/YYYY');
        setData(eventsSevenDays);
    }


    async function getData() {
        const events = await getEvents();
        const eventsSevenDays = await getEventsSevenDaysResume();
        const resume = await getResume();
        setResume(resume);
        setEventsToday(events);
        setEventsSevenDays(eventsSevenDays);
        setFormat('H:mm'); //DD/MM/YYYY
        setData(events);
        setLoading(false);
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <Text style={styles.title}>Carregando dados ....</Text>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.background}>
                <ScrollView>
                    <Text style={styles.title}>Consumo</Text>
                    <Text style={styles.parcial}>Consumo parcial no mês:</Text>
                    <View style={styles.card_header}>
                        <View style={styles.card_template2}>
                            <Text style={styles.event_sumary}>R$ {formatNumber(resume.COST)}</Text>
                        </View>
                        <View style={styles.card_template3}>
                            <Text style={styles.event_sumary2}>{formatNumber(resume.KWH, 2, '.')} kwh</Text>
                        </View>
                    </View>
                    <Text style={styles.parcial}>Selecione:</Text>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity style={styles.button} onPress={setDayEvents}>
                            <Text style={styles.buttonText}>Diário</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={setWeekEvents}>
                            <Text style={styles.buttonText}>Semanal</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.column}>
                        <View style={styles.line}>
                            <Text style={styles.event_date}>#</Text>
                            <Text style={styles.event_kwh}>Consumo</Text>
                            <Text style={styles.event_cost}>Valor</Text>
                        </View>
                        {data.map((event, i) => {
                            return (
                                <View style={styles.line} key={i}>
                                    <Text style={styles.event_date}>{formatDate(event.DATE, format)}</Text>
                                    <Text style={styles.event_kwh}>{formatNumber(event.KWH, 2, '.')} kwh</Text>
                                    <Text style={styles.event_cost}>R$ {formatNumber(event.COST)}</Text>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView >
        );
    }
}

export default EventsScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#EEE",
    },
    parcial: {
        flex: 1,
        marginLeft: 10,
        color: "#000"
    },
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEE",
    },
    card_header: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        margin: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "900",
        margin: 10,
        color: "#18A"
    },
    info: {
        color: "#333",
        fontWeight: "900"
    },
    card_template: {
        backgroundColor: "#FFF",
        padding: 20,
        margin: 10,
    },
    card_template2: {
        backgroundColor: "#38A",
        color: "#FFF",
        padding: 20,
        width: "55%",
        marginRight: 5,
    },
    card_template3: {
        backgroundColor: "#FFF",
        padding: 20,
        width: "39%",
        backgroundColor: "#DDD"
    },
    event_sumary: {
        fontSize: 30,
        fontWeight: "900",
        color: "#FFF"
    },
    event_sumary2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 23,
        color: "#000",
    },
    event_kwh: {
        fontSize: 18,
        fontWeight: "500",
        color: "#18A",
        color: "#333",
        width: "30%",
    },
    event_cost: {
        fontSize: 18,
        fontWeight: "500",
        color: "#18A",
        width: "25%",
    },
    event_date: {
        fontSize: 20,
        color: "#333",
        fontWeight: "500",
        width: "35%",
        marginBottom: 8
    },
    column: {
        flex: 1,
        flexDirection: "column",
        color: "#FFF",
        top: 10,
    },
    line: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 15,
        width: "100%",
        borderBottomColor: '#AAA',
        borderBottomWidth: 1,
    },
    buttonArea: {
        flex: 1,
        alignContent: "center",

        flexDirection: "row",
        margin: 10,
    },
    button: {
        backgroundColor: '#188',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 1,
        width: "20%"
    },
    buttonText: {
        color: '#FFF',
        fontWeight: "800",
        fontSize: 15,
        margin: 5
    },
});