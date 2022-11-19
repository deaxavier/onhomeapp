import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    View,
    Animated,
    Image,
    StyleSheet
} from "react-native";

export default function SpashScreen({ navigation }) {
    const [opacity] = useState(new Animated.Value(0))

    useEffect(() => {
        loadAnimation();
        setTimeout(() => {
            navigation.replace('LoginScreen')
        }, 3100);
    }, []);

    function loadAnimation() {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 3000
            }
            )]
        ).start();
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.backgroud}>
            <View style={styles.header}>
                <Animated.Image style={[
                    styles.container,
                    {
                        opacity: opacity
                    }
                ]}
                    source={require('../assets/electricity.png')}
                />
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
    }
});