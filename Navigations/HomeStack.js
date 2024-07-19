import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/Screens/Home';
import CategoryProducts from "../src/Screens/CategoryProducts";
import ProductDetailsPopup from "../src/Screens/ProductDetailsPopup";
import UserProfile from "../src/Screens/UserProfile";
import MyOrdersScreen from "../src/Screens/MyOrdersScreen";
import PaymentMethodsScreen from "../src/Screens/PaymentMethodsScreen";
import IngredientsScreen from "../src/Screens/IngredientsScreen";
import Dishes from "../src/Screens/Dishes";
import RegionalDishesScreen from "../src/Screens/RegionalDishesScreen";
import CheckoutScreen from "../src/Screens/CheckoutScreen";
import OrderConfirmationScreen from "../src/Screens/OrderConfirmationScreen";
import SettingsScreen from "../src/Screens/SettingsScreen";
import Cart from "../src/Screens/Cart";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: false ,// Disable animations
                animation: 'slide_from_right'

            }}>
            <Stack.Screen name="HomeMain" component={Home} />
            <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
            <Stack.Screen name="ProductDetailsPopup" component={ProductDetailsPopup} />



        </Stack.Navigator>
    );
};

export const CartStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: false ,// Disable animations,// Disable animations
                animation: 'slide_from_right'
            }}>
            <Stack.Screen name="Cart" component={Cart} />

            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
        </Stack.Navigator>
    );
};

export const DishesStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animation: 'slide_from_bottom'
            }}>
            <Stack.Screen name="RegionalDishes" component={RegionalDishesScreen} />
            <Stack.Screen name="Dishes" component={Dishes} />
            <Stack.Screen name="Ingredients" component={IngredientsScreen} />
        </Stack.Navigator>
    );
};

export const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                animationEnabled: false // Disable animations
            }}>
            <Stack.Screen name="Profile" component={UserProfile} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
};
