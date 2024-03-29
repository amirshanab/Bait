import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {myColors as color} from "../Utils/MyColors";
import {useNavigation} from "@react-navigation/native";
import {ThemeContext} from "../../contexts/ThemeContext";


const UserProfile = () => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];

    const nav = useNavigation();
    // Placeholder for user information - replace with actual data retrieval logic
    const userInfo = {
        name: 'John Doe',
        email: 'johndoe@example.com',
    };

    // Function to handle sign out - implement your sign-out logic here
    const handleSignOut = () => {
        nav.navigate('Splash');
    };
    // console.log(myColors.primary);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: myColors.primary,}]}>
            <ScrollView style={styles.container}>
                {/* Header Logo */}
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/logo.png')}/>
                </View>

                {/* User Information */}
                <View style={styles.userInfoSection}>
                    <Text style={[styles.userName, {color: myColors.text}]}>{userInfo.name}</Text>
                    <Text style={[styles.userEmail, {color: myColors.text}]}>{userInfo.email}</Text>
                </View>

                {/* User Actions */}
                <View style={styles.userActions}>
                    <TouchableOpacity onPress={() => {
                        nav.navigate('MyOrders')
                    }} style={[styles.actionButton, {backgroundColor: myColors.tertiary,}]}>
                        <Text style={[styles.actionButtonText, {color: myColors.text}]}>My Orders</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                    }} style={[styles.actionButton, {backgroundColor: myColors.tertiary,}]}>
                        <Text style={[styles.actionButtonText, {color: myColors.text}]}>My Addresses</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        nav.navigate('PaymentMethods')
                    }} style={[styles.actionButton, {backgroundColor: myColors.tertiary,}]}>
                        <Text style={[styles.actionButtonText, {color: myColors.text}]}>Payment Methods</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        nav.navigate('Settings')
                    }} style={[styles.actionButton, {backgroundColor: myColors.tertiary,}]}>
                        <Text style={[styles.actionButtonText, {color: myColors.text}]}>App Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                        <Text style={[styles.signOutButtonText, {color: myColors.text,}]}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    logo: {
        width: 70,
        height: 70,
    },
    userInfoSection: {
        alignItems: 'center',
        marginTop: 30,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 18,
    },
    userActions: {
        marginTop: 50,
    },
    actionButton: {

        padding: 15,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 18,

    },
    signOutButton: {
        backgroundColor: 'rgba(255,68,68,0.85)',
        padding: 15,
        marginHorizontal: 20,
        marginTop: 50,
        borderRadius: 5,
        alignItems: 'center',
    },
    signOutButtonText: {
        fontWeight: '600',
        fontSize: 18,

    },
});

export default UserProfile;
