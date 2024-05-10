import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AuthStack from './AuthStack'; // Import your authentication stack
import HomeStack from './BottomTabBar'; // Import your home stack
import { onAuthStateChanged } from "firebase/auth";
import { authentication, db } from "../Firebaseconfig";
import {doc, getDoc} from "firebase/firestore";
import {useUser} from "../contexts/UserContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const { setUser } = useUser();

    // Function to handle successful login
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    // Function to fetch user data
    const fetchUserData = async () => {
        const user = authentication.currentUser;
        if (user) {
            try {
                const userDocRef = doc(db,"Users",user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    // Function to check authentication status
    const checkAuthentication = () => {
        onAuthStateChanged(authentication, (user) => {
            if (user) {
                setIsAuthenticated(true); // User is authenticated
                fetchUserData(); // Fetch user data when user is authenticated
            } else {
                setIsAuthenticated(false); // User is not authenticated
            }
        });
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
                    <Stack.Screen name="HomeStack">
                        {(props) => <HomeStack {...props} userData={userData} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen
                        name="Auth"
                        options={{ animationTypeForReplace: 'pop' }}
                    >
                        {(props) => <AuthStack {...props} handleLoginSuccess={handleLoginSuccess} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
