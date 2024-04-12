import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../src/Screens/Auth/Login';
import SignupScreen from '../src/Screens/Auth/Signup';
import ForgotPasswordScreen from '../src/Screens/Auth/ForgotPassword';

const Stack = createStackNavigator();

const AuthStack = ({ handleLoginSuccess }) => {
    return (
        <Stack.Navigator
            screenOptions={{headerShown:false}}>
            <Stack.Screen
                name="Login"
                options={{
                    title: 'Login',
                    // You can customize header styles or options here
                }}
            >
                {(props) => <LoginScreen {...props} handleLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    title: 'Sign Up',
                    // You can customize header styles or options here
                }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                    title: 'Forgot Password',
                    // You can customize header styles or options here
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
