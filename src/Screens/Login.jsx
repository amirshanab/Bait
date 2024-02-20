import React, { useState, useRef } from "react";
import { Image, ScrollView, StatusBar, Text, TextInput, View, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../Utils/MyColors";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { authentication } from "../../Firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const nav = useNavigation(); // Get navigation object
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    });
    const { email, password } = userCredentials;

    const loginUser = () => {
        signInWithEmailAndPassword(authentication, email, password)
            .then(() => {
                // Navigate to the main screen upon successful login
                // Replace 'Main' with the name of your main screen component
                nav.navigate('Main');
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    Alert.alert('Invalid email or password. Please try again.');
                } else {
                    Alert.alert('An error occurred. Please try again later.');
                }
                console.error(error);
            });
    }
    //hi

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
            <StatusBar style={'light'} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 30, paddingBottom: 100 }}>

                    <Image
                        style={{ height: 120, width: 220, alignSelf: 'center' }}
                        source={require('../assets/logo.png')} />

                    {/* Login Section */}
                    <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                        <Text style={{ color: 'black', fontSize: 26, fontWeight: '700' }}>Login</Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 5 }}>Enter your credentials to continue</Text>

                        {/* Email */}
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }}>Email</Text>
                        <TextInput ref={emailInputRef} value={email}
                                   onChangeText={(val) => setUserCredentials({ ...userCredentials, email: val })}
                                   keyboardType={"email-address"} style={{
                            borderColor: myColors.grey,
                            borderBottomWidth: 2,
                            fontSize: 16,
                            marginTop: 15
                        }} onSubmitEditing={() => passwordInputRef.current.focus()} />

                        {/* Password */}
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }}>Password</Text>
                        <View style={{
                            borderColor: myColors.grey,
                            borderBottomWidth: 2,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "center"
                        }}>
                            <TextInput ref={passwordInputRef} value={password}
                                       onChangeText={(val) => setUserCredentials({ ...userCredentials, password: val })}
                                       secureTextEntry={isPasswordVisible} maxLength={20} keyboardType={"ascii-capable"}
                                       style={{ fontSize: 17, marginTop: 15, flex: 0.9 }} onSubmitEditing={loginUser} />
                            <Ionicons onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                      name={isPasswordVisible === true ? "eye-off-outline" : 'eye-outline'} size={24}
                                      color="black" />
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity onPress={() => nav.navigate('ForgotPassword')}>
                            <Text style={{ fontSize: 16, fontWeight: '400', color: myColors.clickable, marginTop: 20, textAlign: 'right' }}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity onPress={loginUser}>
                            <View style={{
                                backgroundColor: myColors.clickable,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 30,
                                borderRadius: 10
                            }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Login</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Don't have an account */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: '400' }}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => nav.navigate('Signup')}>
                                <Text
                                    style={{ color: myColors.clickable, fontSize: 16, fontWeight: '700', marginLeft: 5 }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Login;
