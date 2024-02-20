import React, { useState, useRef } from "react";
import { Image, ScrollView, StatusBar, Text, TextInput, View, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../Utils/MyColors";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import { authentication } from "../../Firebaseconfig";

const ForgotPassword = () => {
    const nav = useNavigation(); // Get navigation object
    const emailInputRef = useRef(null);
    const [email, setEmail] = useState("");

    const resetPassword = () => {
        if (!email) {
            Alert.alert("Please enter your email.");
            return;
        }

        sendPasswordResetEmail(authentication, email)
            .then(() => {
                Alert.alert('Password reset email sent. Check your inbox.');
                // Navigate to the login screen or any other screen as needed
                // Replace 'Login' with the name of your login screen component
                nav.navigate('Login');
            })
            .catch(error => {
                Alert.alert('An error occurred. Please try again later.');
                console.error(error);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
            <StatusBar style={'light'} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 30, paddingBottom: 100 }}>

                    {/* Logo */}
                    <Image
                        style={{ height: 200, width: 350, borderColor: 'black', borderWidth: 2, alignSelf: 'center' }}
                        source={require('../assets/logo.png')} />

                    {/* Forgot Password Section */}
                    <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                        <Text style={{ color: 'black', fontSize: 26, fontWeight: '700' }}>Forgot Password</Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 5 }}>Enter your email to reset your password</Text>

                        {/* Email */}
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }}>Email</Text>
                        <TextInput ref={emailInputRef} value={email}
                                   onChangeText={(val) => setEmail(val)}
                                   keyboardType={"email-address"} style={{
                            borderColor: myColors.grey,
                            borderBottomWidth: 2,
                            fontSize: 16,
                            marginTop: 15
                        }} onSubmitEditing={resetPassword} />

                        {/* Reset Password Button */}
                        <TouchableOpacity onPress={resetPassword}>
                            <View style={{
                                backgroundColor: myColors.clickable,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 30,
                                borderRadius: 10
                            }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Reset Password</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Back to Login */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: '400' }}>Remembered your password?</Text>
                            <TouchableOpacity onPress={() => nav.navigate('Login')}>
                                <Text
                                    style={{ color: myColors.clickable, fontSize: 16, fontWeight: '700', marginLeft: 5 }}>Login</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default ForgotPassword;
