import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './HomeStack';
import Cart from '../src/Screens/Cart';
import UserProfile from '../src/Screens/UserProfile';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { myColors } from "../src/Utils/MyColors";

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
                    } else if (route.name === 'Profile') { // Add condition for UserProfile
                        iconName = 'user'; // FontAwesome icon for user/profile
                    }
                    // Return the appropriate icon based on the route
                    if (iconName) {
                        if (route.name === 'Home') {
                            return <AntDesign name={iconName} size={size} color={color} />;
                        } else {
                            return <FontAwesome name={iconName} size={size} color={color} />;
                        }
                    }
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: myColors.back,
                    paddingBottom: 20,
                    paddingTop: 10,
                    height: 80,
                },
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
                            screen: 'HomeMain',
                        });
                    },
                })}
            />
            <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default BottomTabBar;
