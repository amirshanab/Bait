import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/Screens/Home';
import CategoryProducts from "../src/Screens/CategoryProducts"; // Example additional screen
import ProductDetailsPopup from "../src/Screens/ProductDetailsPopup"; // Example additional screen

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={Home} />
            <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
            <Stack.Screen name="ProductDetailsPopup" component={ProductDetailsPopup} />
            {/* Add other screens that should be accessible from the Home tab here */}
        </Stack.Navigator>
    );
};
