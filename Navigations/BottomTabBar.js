import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeStack,CartStack,DishesStack,ProfileStack } from './HomeStack';
import Cart from '../src/Screens/Cart';
import RegionalDishesScreen from "../src/Screens/RegionalDishesScreen";
import { FontAwesome } from '@expo/vector-icons';
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
const Tab = createMaterialBottomTabNavigator();
import { myColors as color } from "../src/Utils/MyColors";
import { selectUniqueProductCount  } from '../Redux/CartSlice';
import {useSelector} from "react-redux";
import {Platform} from "react-native";


const BottomTabBar = () => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    const cartItemCount = useSelector(selectUniqueProductCount );

    return (

        <Tab.Navigator
            shifting={true}
            activeColor={myColors.text} // Highlight color for the icons

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'CartTab') {
                        iconName = 'opencart';
                    } else if (route.name === 'ProfileTab') {
                        iconName = 'user';
                    } else if (route.name === 'RegionalDishesScreen') {
                        iconName = 'list';
                    }
                    if (iconName) {
                        return (
                            <FontAwesome
                                name={iconName}
                                size={20}
                                color={focused ? 'black' : myColors.MenuItems} // Change color based on focus
                            />
                        );
                    }
                },
            })}
            barStyle={{ backgroundColor: myColors.logo,height: Platform.OS === 'ios' ? 90:70}} // Set background color
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{ tabBarLabel: 'Home'}}
            />
            <Tab.Screen
                name="CartTab"
                component={CartStack}
                options={{ tabBarLabel: 'Cart' , color: myColors.text, tabBarBadge: cartItemCount > 0 ? cartItemCount : null,}}
            />
            <Tab.Screen
                name="RegionalDishesScreen"
                component={DishesStack}
                options={{ tabBarLabel: 'Dishes', color: myColors.text }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStack}
                options={{ tabBarLabel: 'Profile' , color: myColors.text}}
            />
        </Tab.Navigator>

            );
};

export default BottomTabBar;
