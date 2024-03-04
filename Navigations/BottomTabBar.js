import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './HomeStack';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Cart from '../src/Screens/Cart';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Cart') {
                        iconName = 'opencart';
                    }
                    if (iconName) {
                        return route.name === 'Home' ? <AntDesign name={iconName} size={size} color={color} /> : <FontAwesome name={iconName} size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{ headerShown: false }}
                listeners={({ navigation }) => ({
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate('Home', {
                            screen: 'HomeMain', // Make sure this matches the name of your initial Home screen within the HomeStack
                        });
                    },
                })}
            />
            <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default BottomTabBar;
