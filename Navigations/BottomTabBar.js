import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack} from './HomeStack';
import Cart from '../src/Screens/Cart';
import UserProfile from '../src/Screens/UserProfile';
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import RegionalDishesScreen from "../src/Screens/RegionalDishesScreen";
import {myColors as color } from "../src/Utils/MyColors";
import {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {

    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Cart') {
                        iconName = 'opencart';
                    } else if (route.name === 'Profile') { // Add condition for UserProfile
                        iconName = 'user'; // FontAwesome icon for user/profile
                    }
                    else if (route.name === 'RegionalDishesScreen') { // Add condition for DishesScreen
                        iconName = 'list'; // FontAwesome icon for list
                    }
                    // Return the appropriate icon based on the route
                    if (iconName) {
                        if (route.name === 'Home') {
                            return <AntDesign name={iconName} size={size} color={myColors.text}/>;
                        } else {
                            return <FontAwesome name={iconName} size={size} color={myColors.text}/>;
                        }
                    }
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: myColors.text,
                tabBarStyle: {
                    backgroundColor: myColors.buttombar,
                    paddingBottom: 20,
                    paddingTop: 10,
                    height: 90,
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{headerShown: false}}
                listeners={({navigation}) => ({
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate('Home', {
                            screen: 'HomeMain',
                        });
                    },
                })}
            />
            <Tab.Screen name="Cart" component={Cart} options={{headerShown: false}}/>
            <Tab.Screen name= "RegionalDishesScreen" component={RegionalDishesScreen} options={{headerShown: false, tabBarLabel: 'Dishes'}}/>
            <Tab.Screen name="Profile" component={UserProfile} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
};

export default BottomTabBar;
