import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { myColors as color } from "../Utils/MyColors";
import Logo from "../Components/Logo";
import { useRoute } from "@react-navigation/native";
import { ThemeContext } from '../../contexts/ThemeContext';
import OrderServices from "../../Services/OrderServices";
import { useSelector, useDispatch } from "react-redux";
import { ClearCart } from "../../Redux/CartSlice";
import LoadingScreen from '../Components/LoadingScreen';

export default function OrderConfirmationScreen() {
    const [theme] = useContext(ThemeContext);
    const route = useRoute();
    const { totalAmount, items, selectedDate, selectedPaymentMethod, locationUrl } = route.params;
    const myColors = color[theme.mode];
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const uploadOrder = async () => {
            try {
                await OrderServices(items, totalAmount, selectedDate, selectedPaymentMethod, locationUrl);
                dispatch(ClearCart());
            } catch (error) {
                console.error("Error uploading order:", error);
            } finally {
                setIsLoading(false);
            }
        };
        uploadOrder();
    }, [items, totalAmount, selectedDate, selectedPaymentMethod, locationUrl, dispatch]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: myColors.primary }]}>
            <Logo />
            <Text style={[styles.header, { color: myColors.text }]}>Order Confirmed!</Text>
            <Text style={[styles.text, { color: myColors.text }]}>
                Thank you for your purchase. Your order is being processed, and you will receive an email with your order details and tracking information shortly.
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});
