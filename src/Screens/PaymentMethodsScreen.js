import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                </View>
            </View>

            {/* Credit Card Form */}
            <View style={styles.cardContainer}>
                <TextInput placeholder="Card Number" style={styles.input} keyboardType="numeric" />
                <TextInput placeholder="MM/YY" style={styles.input} keyboardType="numeric" />
                <TextInput placeholder="CVV" style={styles.input} keyboardType="numeric" secureTextEntry={true} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        padding: 20,
    },
    logoContainer: {
        // Style as needed
    },
    logo: {
        width: 100, // Adjust according to your logo
        height: 50, // Adjust according to your logo
    },
    cardContainer: {
        elevation: 2,
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 8,
        width: '90%',
    },
    input: {
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
});

export default PaymentScreen;
