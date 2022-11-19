import React, { useState, useEffect } from "react";

import { useForm } from 'react-hook-form'
import {
    KeyboardAvoidingView,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    Keyboard,
    Alert
} from "react-native";
import { baseUrl } from "../helpers/consts";

export default function LoginScreen({ navigation }) {
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({ x: 220, y: 200 }))
    const { register, setValue, handleSubmit } = useForm()


    useEffect(() => {
        register('email')
        register('password')
    }, [register]);


    useEffect(() => {
        mapEvents();
        loadAnimation();
    }, []);

    function changeLogoPosition(valueX, valueY) {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: valueX,
                duration: 1000
            }),
            Animated.timing(logo.y, {
                toValue: valueY,
                duration: 1000
            })
        ]).start()

    }

    function loadAnimation() {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 3000
            }
            )]
        ).start();
    }

    function keyboardDidShow() {
        changeLogoPosition(0, 0);
    }

    function keyboardDidHide() {
        changeLogoPosition(220, 200);
    }

    function mapEvents() {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    }

    const onSubmit = (data) => {
        if (data.email != undefined
            && data.password != undefined) {
            var json = JSON.stringify(data);
            fetch(baseUrl + 'login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: json,
            }).then((response) => {
                switch (response.status) {
                    case 200:
                        response.text().then(function (token) {
                            navigation.replace('LoadScreen', { token });
                        });
                        break;
                    default:
                        Alert.alert('OnHome', 'Usuario ou senha inválidos\nVerifique seus dados e tente novamente')
                        break;
                }
            }).catch((err) => Alert.alert('OnHome', 'Não foi possivel acessar nossos servidores\n Por favor tente mais tarde'));

        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.backgroud}>
            <View style={styles.header}>
                <Animated.Image
                    source={require('../assets/electricity.png')}
                    style={{
                        width: logo.x,
                        height: logo.y
                    }}
                />
                <Text style={styles.title} >OnHome</Text>
            </View>
            <Animated.View style={[
                styles.container,
                {
                    opacity: opacity,
                    transform: [
                        { translateY: offset.y }
                    ]
                }
            ]}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#DDD" 
                    autoCorrect={false}
                    onChangeText={text => setValue('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#DDD" 
                    secureTextEntry={true}
                    autoCorrect={false}
                    onChangeText={text => setValue('password', text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    backgroud: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#333",
    },
    container: {
        flex: 1,
        width: '98%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#222",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    header: {
        color: '#000',
        fontSize: 50,
        padding: 50
    },
    input: {
        backgroundColor: "#FFF",
        width: '88%',
        fontSize: 17,
        color: "#000",
        fontWeight: "bold",
        borderRadius: 12,
        padding: 10,
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#0DD',
        height: 45,
        width: '88%',
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
    title: {
        fontSize: 50,
        color: "#FFF"
    }
});