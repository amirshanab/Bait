import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeStack } from './HomeStack';
import Cart from '../src/Screens/Cart';
import UserProfile from '../src/Screens/UserProfile';
import RegionalDishesScreen from "../src/Screens/RegionalDishesScreen";
import { FontAwesome } from '@expo/vector-icons';
import {myColors as color } from "../src/Utils/MyColors";
import {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
const Tab = createMaterialBottomTabNavigator();

const BottomTabBar = () => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    return (

        <Tab.Navigator
            shifting={true}
            screenOptions={({ route }) => ({
                tabBarIcon: ({  color }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Cart') {
                        iconName = 'opencart';
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
                    } else if (route.name === 'RegionalDishesScreen') {
                        iconName = 'list';
                    }
                    if (iconName) {
                        return <FontAwesome name={iconName} size={20} color={color} />;
                    }
                },
            })}
            barStyle={{ backgroundColor: myColors.buttombar }} // Set background color
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{ tabBarLabel: 'Cart' }}
            />
            <Tab.Screen
                name="RegionalDishesScreen"
                component={RegionalDishesScreen}
                options={{ tabBarLabel: 'Dishes' }}
            />
            <Tab.Screen
                name="Profile"
                component={UserProfile}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>

            );
};

export default BottomTabBar;
