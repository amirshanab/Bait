import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from "./src/Screens/Splash";
import Login from "./src/Screens/Login";
import Signup from "./src/Screens/Signup";
import ForgotPassword from "./src/Screens/ForgotPassword";
import Home from "./src/Screens/Home";
import ProductDetailsPopup from "./src/Screens/ProductDetailsPopup";
import Cart from "./src/Screens/Cart";
import {Provider} from "react-redux";
import Store from "./Redux/Store";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{headerShown: false, gestureEnabled: false}}>

                    <Stack.Screen name="Splash" component={Splash}/>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Signup" component={Signup}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="ProductDetailsPopup" component={ProductDetailsPopup}/>
                    <Stack.Screen name="Cart" component={Cart}/>

                </Stack.Navigator>
            </NavigationContainer>
         </Provider>

    );
}

export default App;
