import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed
import { myColors } from "../Utils/MyColors"; // Assuming this path is correct

const Tab = createMaterialTopTabNavigator();

function CurrentOrderScreen() {
    // Current Order content
}

function PreviousOrdersScreen() {
    // Previous Orders content
}

function MyOrdersScreen() {
    const navigation = useNavigation(); // Use navigation to handle back button press

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>

                <Image style={styles.logo} source={require('../assets/logo.png')} />

                {/* Invisible placeholder to balance the layout */}
                <View style={styles.placeholder} />
            </View>
            <Tab.Navigator
                initialRouteName="CurrentOrder"
                screenOptions={{
                    tabBarActiveTintColor: '#e91e63',
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarStyle: { backgroundColor: myColors.tertiary },
                }}
            >
                <Tab.Screen
                    name="CurrentOrder"
                    component={CurrentOrderScreen}
                    options={{ tabBarLabel: 'Current Order' }}
                />
                <Tab.Screen
                    name="PreviousOrders"
                    component={PreviousOrdersScreen}
                    options={{ tabBarLabel: 'Previous Orders' }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Adjusts children to space between
        paddingHorizontal: 10,
        paddingTop: 0,
        backgroundColor: myColors.primary,
    },
    backButton: {
        // Keep as it is to align the back button to the left
    },
    logo: {
        width: 70,
        height: 70,
    },
    placeholder: {
        // This should be approximately the same size as the back button to balance the layout
        width: 28, // Adjust the width to match the back button's visual space
        height: 28, // Adjust the height as needed
        opacity: 0, // Make it invisible
    },
    // Add other styles here as needed
});

export default MyOrdersScreen;
