import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/Screens/Home';
import CategoryProducts from "../src/Screens/CategoryProducts"; // Example additional screen
import ProductDetailsPopup from "../src/Screens/ProductDetailsPopup"; // Example additional screen
import UserProfile from "../src/Screens/UserProfile"; // Example additional screen
import MyOrdersScreen from "../src/Screens/MyOrdersScreen"; // Example additional screen
import PaymentMethodsScreen from "../src/Screens/PaymentMethodsScreen"; // Example additional screen
import IngredientsScreen from "../src/Screens/IngredientsScreen";
import DishesScreen from "../src/Screens/DishesScreen";

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false , gestureEnabled : false }}>
            <Stack.Screen name="HomeMain" component={Home} />
            <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
            <Stack.Screen name="ProductDetailsPopup" component={ProductDetailsPopup} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="Ingredients" component={IngredientsScreen} />
            <Stack.Screen name="Dishes" component={DishesScreen} />
        </Stack.Navigator>
    );
};
