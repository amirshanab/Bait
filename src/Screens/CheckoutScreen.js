import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { myColors } from "../Utils/MyColors";

export default function CheckoutScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                </View>
                <Text style={styles.header}>Checkout</Text>
                {/* Shipping Information */}
                <TextInput style={styles.input} placeholder="Name" />
                <TextInput style={styles.input} placeholder="Address" />
                <TextInput style={styles.input} placeholder="City" />
                {/* Delivery Options */}
                <Text style={styles.subheader}>Delivery Options</Text>
                {/* Placeholder for delivery options */}
                {/* Payment Methods */}
                <Text style={styles.subheader}>Payment Method</Text>
                {/* Placeholder for payment methods */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrderConfirmation')}>
                    <Text style={styles.buttonText}>Confirm Order</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: myColors.primary,
    },
    container: {
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 10,
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
    input: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    subheader: {
        fontSize: 20,
        color: myColors.text,
        marginTop: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: myColors.clickable,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
