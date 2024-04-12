import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AuthStack from './AuthStack'; // Import your authentication stack
import HomeStack from './BottomTabBar'; // Import your home stack
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../Firebaseconfig";

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to handle successful login
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    // Function to check authentication status
    const checkAuthentication = () => {
        onAuthStateChanged(authentication, (user) => {
            if (user) {
                setIsAuthenticated(true); // User is authenticated
            } else {
                setIsAuthenticated(false); // User is not authenticated
            }
        });
        console.log(isAuthenticated)
    };

    // Check authentication status when component mounts
    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.SlideFromRightIOS // Use slide-in animation
                }}
            >
                {isAuthenticated ? (
                    <Stack.Screen name="HomeStack" component={HomeStack} />
                ) : (
                    <Stack.Screen
                        name="Auth"
                        options={{ animationTypeForReplace: 'pop' }}
                    >
                        {props => <AuthStack {...props} handleLoginSuccess={handleLoginSuccess} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
