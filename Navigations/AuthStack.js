import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../src/Screens/Auth/Login";
import Signup from "../src/Screens/Auth/Signup";
import ForgotPassword from "../src/Screens/Auth/ForgotPassword";
import Splash from "../src/Screens/Auth/Splash";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
};

export default AuthStack;
