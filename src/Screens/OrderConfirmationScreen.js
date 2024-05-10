import React from 'react';
import { SafeAreaView,  Text, StyleSheet} from 'react-native';
import { myColors } from "../Utils/MyColors";
import Logo from "../Components/Logo";

export default function OrderConfirmationScreen() {
    return (
        <SafeAreaView style={styles.safe}>
            <Logo/>
            <Text style={styles.header}>Order Confirmed!</Text>
            <Text style={styles.text}>Thank you for your purchase. Your order is being processed, and you will receive an email with your order details and tracking information shortly.</Text>
            {/* Display order summary and tracking info here */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: myColors.primary,
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        marginVertical: 20,
    },
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: myColors.text,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: myColors.text,
        textAlign: 'center',
    },
});
