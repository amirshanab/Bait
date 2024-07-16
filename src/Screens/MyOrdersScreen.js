import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed
import { myColors as color } from "../Utils/MyColors";
import {ThemeContext} from "../../contexts/ThemeContext";
import CurrentOrderScreen from "../Components/currentOrders"
import Logo from "../Components/Logo";
const Tab = createMaterialTopTabNavigator();



function PreviousOrdersScreen() {
}

function MyOrdersScreen() {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    const navigation = useNavigation(); // Use navigation to handle back button press
    const CurrentOrders = () => <CurrentOrderScreen status="Pending" />;
    // Wrapper function for CurrentOrderScreen with "Done" status
    const PreviousOrders = () => <CurrentOrderScreen status="Done" />;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
            <View style={[styles.headerContainer, {backgroundColor: myColors.primary}]}>

                <View />

                <Logo height={50} width={100} />

                {/* Invisible placeholder to balance the layout */}
                <View />
            </View>
            <Tab.Navigator
                initialRouteName="CurrentOrder"
                screenOptions={{
                    tabBarActiveTintColor: myColors.text,
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarStyle: {backgroundColor : myColors.primary},
                }}
            >
                <Tab.Screen
                    name="CurrentOrder"
                    component={CurrentOrders}
                    options={{ tabBarLabel: 'Current Orders' }}
                />
                <Tab.Screen
                    name="PreviousOrders"
                    component={PreviousOrders}
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
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 0,

    },


});

export default MyOrdersScreen;
