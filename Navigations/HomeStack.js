import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/Screens/Home';
import CategoryProducts from "../src/Screens/CategoryProducts";
import ProductDetailsPopup from "../src/Screens/ProductDetailsPopup";
import UserProfile from "../src/Screens/UserProfile";
import MyOrdersScreen from "../src/Screens/MyOrdersScreen";
import PaymentMethodsScreen from "../src/Screens/PaymentMethodsScreen";
import IngredientsScreen from "../src/Screens/IngredientsScreen";
import DishesScreen from "../src/Screens/DishesScreen";

import RegionalDishesScreen from "../src/Screens/RegionalDishesScreen";
import CheckoutScreen from "../src/Screens/CheckoutScreen";
import OrderConfirmationScreen from "../src/Screens/OrderConfirmationScreen";
import SettingsScreen from "../src/Screens/SettingsScreen";

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: false // Disable animations
            }}>

            <Stack.Screen name="HomeMain" component={Home} />
            <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
            <Stack.Screen name="ProductDetailsPopup" component={ProductDetailsPopup} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="RegionalDishes" component={RegionalDishesScreen} />
            <Stack.Screen name="Dishes" component={DishesScreen} />
            <Stack.Screen name="Ingredients" component={IngredientsScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
};
