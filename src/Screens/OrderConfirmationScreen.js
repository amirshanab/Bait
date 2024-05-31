import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import {myColors, myColors as color} from "../Utils/MyColors";
import Logo from "../Components/Logo";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTheme } from "react-native-paper";
import OrderServices from "../../Services/OrderServices";
import LoadingScreen from '../Components/LoadingScreen'; // Adjust the import path as necessary

export default function OrderConfirmationScreen() {
    const [theme] = useContext(ThemeContext);
    const { } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { totalAmount, items,selectedDate,selectedPaymentMethod,locationUrl } = route.params;
    const myColors = color[theme.mode];

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const uploadOrder = async () => {
            await OrderServices(items, totalAmount, selectedDate,selectedPaymentMethod,locationUrl);
            setLoading(false);
        };
        uploadOrder();
    }, [items, totalAmount,selectedDate,selectedPaymentMethod,locationUrl]);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <SafeAreaView style={styles.safe}>
            <Logo />
            <Text style={styles.header}>Order Confirmed!</Text>
            <Text style={styles.text}>
                Thank you for your purchase. Your order is being processed, and you will receive an email with your order details and tracking information shortly.
            </Text>
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
