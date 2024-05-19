import React from 'react';
import {SafeAreaView,  Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {myColors as color} from '../Utils/MyColors';
import {ThemeContext} from "../../contexts/ThemeContext";
import Logo from "../Components/Logo";

export default function CheckoutScreen({navigation}) {
    const [theme] = React.useContext(ThemeContext);
    let myColors = color[theme.mode];
    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: myColors.primary,}]}>
            <ScrollView                 showsVerticalScrollIndicator={false}
                                        contentContainerStyle={styles.container}>
                <Logo/>
                <Text style={[styles.header, {color: myColors.text,}]}>Checkout</Text>
                {/* Shipping Information */}
                <TextInput style={[styles.input, {backgroundColor: myColors.white, color: myColors.text}]}
                           placeholder="Name" placeholderTextColor={myColors.placeholder}/>
                <TextInput style={[styles.input, {backgroundColor: myColors.white, color: myColors.text}]}
                           placeholder="Address" placeholderTextColor={myColors.placeholder}/>
                <TextInput style={[styles.input, {backgroundColor: myColors.white, color: myColors.text}]}
                           placeholder="City" placeholderTextColor={myColors.placeholder}/>
                {/* Delivery Options */}
                <Text style={[styles.subheader, {color: myColors.text,}]}>Delivery Options</Text>
                {/* Placeholder for delivery options */}
                {/* Payment Methods */}
                <Text style={[styles.subheader, {color: myColors.text,}]}>Payment Method</Text>
                {/* Placeholder for payment methods */}
                <TouchableOpacity style={[styles.button, {backgroundColor: myColors.clickable,}]}
                                  onPress={() => navigation.navigate('OrderConfirmation')}>
                    <Text style={[styles.buttonText, {color: myColors.text,}]}>Confirm Order</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,

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

        marginBottom: 20,
    },
    input: {
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    subheader: {
        fontSize: 20,

        marginTop: 20,
        marginBottom: 10,
    },
    button: {

        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {

        fontWeight: 'bold',
    },
});
