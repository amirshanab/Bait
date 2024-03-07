import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {myColors} from "../Utils/MyColors";
import {useNavigation} from "@react-navigation/native";
import MyOrdersScreen from "./MyOrdersScreen";

const UserProfile = () => {
    const nav = useNavigation();
    // Placeholder for user information - replace with actual data retrieval logic
    const userInfo = {
        name: 'John Doe',
        email: 'johndoe@example.com',
    };

    // Function to handle sign out - implement your sign-out logic here
    const handleSignOut = () => {
         nav.navigate('Splash');
        // Typically, you would call your authentication service's sign-out method here
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
            {/* Header Logo */}
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>

            {/* User Information */}
            <View style={styles.userInfoSection}>
                <Text style={styles.userName}>{userInfo.name}</Text>
                <Text style={styles.userEmail}>{userInfo.email}</Text>
            </View>

            {/* User Actions */}
            <View style={styles.userActions}>
                <TouchableOpacity onPress={() => {nav.navigate('MyOrders')}} style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>My Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>My Addresses</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {nav.navigate('PaymentMethods')}} style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Payment Methods</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                    <Text style={styles.signOutButtonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.primary,
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
        color: '#333',
    },
    userEmail: {
        fontSize: 18,
        color: '#666',
    },
    userActions: {
        marginTop: 50,
    },
    actionButton: {
        backgroundColor: myColors.tertiary,
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 18,
        color: '#333',
    },
    signOutButton: {
        backgroundColor: '#ff4444',
        padding: 15,
        marginHorizontal: 20,
        marginTop: 50,
        borderRadius: 5,
        alignItems: 'center',
    },
    signOutButtonText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default UserProfile;
