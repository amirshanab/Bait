import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../src/Screens/Home';
import Cart from '../src/Screens/Cart';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'TabHome') {
                        iconName = 'home';
                        return <AntDesign name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Cart') {
                        iconName = 'opencart';
                        return <FontAwesome name={iconName} size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: 'lightgray',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
            })}
        >
            <Tab.Screen name="TabHome" component={Home} />
            <Tab.Screen name="Cart" component={Cart} />
        </Tab.Navigator>
    );
};

export default BottomTabBar;
