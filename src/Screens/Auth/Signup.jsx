import React, { useState, useRef } from "react";
import {  ScrollView, StatusBar, Text, TextInput, View, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {authentication, db} from "../../../Firebaseconfig";
import {myColors as color } from "../../Utils/MyColors";
import Logo from "../../Components/Logo";
import { doc,setDoc } from "firebase/firestore";



const theme = {mode: 'light'};
let myColors = color[theme.mode];

const Signup = () => {
    const nav = useNavigation(); // Get navigation object
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
    const emailInputRef = useRef(null);
    const phoneNumberInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const nameInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);
    const [userCredentials, setUserCredentials] = useState({
        name :"",
        email: "",
        phoneNumber : "",
        password: "",
        confirmPassword: "",
    });
    const { name,email,phoneNumber ,password, confirmPassword } = userCredentials;
    const validateFields = () => {
        if (!email || !password || !confirmPassword || !phoneNumber||!name) {
            Alert.alert("All fields are required");
            return false;
        }

        // Add additional validation logic for email, password, and phone number if needed

        if (password !== confirmPassword) {
            Alert.alert("Passwords don't match");
            return false;
        }

        return true;
    };
    const userAccount = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(authentication, email, password);
            const newUser = userCredential.user;

            const docRef = doc(db, "Users", newUser.uid);

            // Add user data to the document
            await setDoc(docRef, {
                name: name,
                email: newUser.email,
                phoneNumber: phoneNumber,
            });

            Alert.alert('User account created & signed in!');
            nav.navigate('Login');
        } catch (error) {
            if (error.code === 'authentication/email-already-in-use') {
                Alert.alert('That email address is already in use!');
            }

            if (error.code === 'authentication/invalid-email') {
                Alert.alert('That email address is invalid!');
            }
            console.error(error);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
            <StatusBar style={'light'} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 30, paddingBottom: 100 }}>

                    {/* Logo */}
                    <Logo width={150} height={80} />

                    {/* Sign Up Section */}
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                        <Text style={{ color: 'black', fontSize: 26, fontWeight: '700' }}>Sign Up</Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 5 }}>Enter your credentials to continue</Text>

                        {/* Name */}
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }}>Name</Text>
                        <TextInput ref={nameInputRef} value={name} maxLength={20} onChangeText={(val) => setUserCredentials({ ...userCredentials, name: val })}
                                   keyboardType={"email-address"} style={{
                            borderColor: myColors.grey,
                            borderBottomWidth: 2,
                            fontSize: 16,
                            marginTop: 15
                        }} onSubmitEditing={() => emailInputRef.current.focus()} />

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
                        {/* Phone Number */}
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }}>Phone Number</Text>
                        <TextInput
                            ref={phoneNumberInputRef}
                            value={phoneNumber}
                            onChangeText={(val) => setUserCredentials({ ...userCredentials, phoneNumber: val })}
                            keyboardType={"phone-pad"}
                            style={{
                                borderColor: myColors.grey,
                                borderBottomWidth: 2,
                                fontSize: 16,
                                marginTop: 15
                            }}
                            onSubmitEditing={() => userAccount()}
                        />
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
                                       style={{ fontSize: 17, marginTop: 15, flex: 0.9 }} onSubmitEditing={() => confirmPasswordInputRef.current.focus()} />
                            <Ionicons onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                      name={isPasswordVisible === true ? "eye-off-outline" : 'eye-outline'} size={24}
                                      color="black" />
                        </View>

                        {/* Confirm Password */}
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }}>Confirm Password</Text>
                        <View style={{
                            borderColor: myColors.grey,
                            borderBottomWidth: 2,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "center"
                        }}>
                            <TextInput ref={confirmPasswordInputRef} value={confirmPassword} onChangeText={(val) => setUserCredentials({ ...userCredentials, confirmPassword: val })}
                                       secureTextEntry={isConfirmPasswordVisible} maxLength={20} keyboardType={"ascii-capable"} style={{ fontSize: 17, marginTop: 15, flex: 0.9 }} />
                            <Ionicons onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                      name={isConfirmPasswordVisible === true ? "eye-off-outline" : 'eye-outline'} size={24}
                                      color="black" />
                        </View>

                        {/* Terms and conditions */}
                        <Text numberOfLines={2} style={{
                            fontSize: 14,
                            fontWeight: "400",
                            color: "black",
                            marginTop: 15,
                            letterSpacing: 0.6,
                            lineHeight: 22,
                            opacity: 0.7
                        }}>By continuing, you agree to our <Text style={{ color: "blue", fontWeight: "bold", opacity: 0.5 }}>terms of service and privacy policy</Text></Text>

                        {/* Sign Up Button */}
                        <TouchableOpacity onPress={userAccount}>
                            <View style={{
                                backgroundColor: myColors.clickable,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 30,
                                borderRadius: 10
                            }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Already have an account and Login */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ color: 'black', fontSize: 16, fontWeight: '400', textAlign: 'center' }}>Already have an account?</Text>
                            </View>
                            <TouchableOpacity onPress={() => nav.navigate('Login')}>
                                <Text style={{ color: myColors.clickable, fontSize: 16, fontWeight: '700', textAlign: 'center'}}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Signup;
