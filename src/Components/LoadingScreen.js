import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';

const LoadingScreen = () => {
    const [fontsLoaded] = useFonts({
        Briem: require('../assets/Fonts/BriemHand-Medium.ttf')
    });

    // Wait until the font is loaded before rendering the LoadingScreen
    if (!fontsLoaded) {
        return null; // Return null if font is not loaded
    }

    return (
        <View style={styles.container}>
            <LottieView
                style={styles.animation}
                source={require('../assets/Animations/Animation.json')}
                autoPlay
                loop
            />
            <Text style={styles.sentence}>Stocking up your cart, fresh items loading in!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 200,
        height: 200,
    },
    sentence: {
        fontSize: 25,
        textAlign: 'center',
        alignContent: "center",
        margin: 0,
        fontFamily: 'Briem'
    },
});

export default LoadingScreen;
