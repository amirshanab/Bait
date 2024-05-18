import React, { useState, useRef } from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    View,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from "../../../Firebaseconfig";
import { myColors as color } from "../../Utils/MyColors";
import Logo from "../../Components/Logo";
import { doc, setDoc } from "firebase/firestore";
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import AwesomeButton from "react-native-really-awesome-button";

const theme = { mode: 'light' };
let myColors = color[theme.mode];

const Signup = () => {
    const nav = useNavigation(); // Get navigation object
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
    const emailInputRef = useRef(null);
    const { width: windowWidth } = Dimensions.get('window');

    const phoneNumberInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const nameInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);
    const [userCredentials, setUserCredentials] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const { name, email, phoneNumber, password, confirmPassword } = userCredentials;

    const validateFields = () => {
        if (!email || !password || !confirmPassword || !phoneNumber || !name) {
            Alert.alert("All fields are required");
            return false;
        }

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
                        <PaperTextInput
                            ref={nameInputRef}
                            value={name}
                            mode={"outlined"}
                            activeOutlineColor = { 'black' }
                            label={'Name'}
                            maxLength={20}
                            onChangeText={(val) => setUserCredentials({ ...userCredentials, name: val })}
                            style={{ marginTop: 50,backgroundColor:myColors.primary }}
                        />

                        {/* Email */}
                        <PaperTextInput
                            ref={emailInputRef}
                            value={email}
                            mode={"outlined"}
                            label={'Email'}
                            onChangeText={(val) => setUserCredentials({ ...userCredentials, email: val })}
                            keyboardType={"email-address"}
                            style={{ marginTop: 35 ,backgroundColor:myColors.primary}}
                        />

                        {/* Phone Number */}
                        <PaperTextInput
                            ref={phoneNumberInputRef}
                            value={phoneNumber}
                            mode={"outlined"}
                            label={'Phone Number'}
                            onChangeText={(val) => setUserCredentials({ ...userCredentials, phoneNumber: val })}
                            keyboardType={"phone-pad"}
                            style={{ marginTop: 35 ,backgroundColor:myColors.primary}}
                            onSubmitEditing={() => userAccount()}
                        />

                        {/* Password */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 35 }}>
                            <PaperTextInput
                                ref={passwordInputRef}
                                value={password}
                                mode={"outlined"}
                                label={'Password'}
                                onChangeText={(val) => setUserCredentials({ ...userCredentials, password: val })}
                                secureTextEntry={isPasswordVisible}
                                maxLength={20}
                                style={{ flex: 1,backgroundColor:myColors.primary,marginRight: 10 }}
                            />
                            <Ionicons onPress={() => setIsPasswordVisible(!isPasswordVisible)} name={isPasswordVisible ? "eye-off-outline" : 'eye-outline'} size={24} color="black" style={{justifyContent:'center',alignItems:'center'}} />
                        </View>

                        {/* Confirm Password */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 35 }}>
                            <PaperTextInput
                                ref={confirmPasswordInputRef}
                                value={confirmPassword}
                                mode={"outlined"}
                                label={'Confirm Password'}
                                onChangeText={(val) => setUserCredentials({ ...userCredentials, confirmPassword: val })}
                                secureTextEntry={isConfirmPasswordVisible}
                                maxLength={20}
                                style={{ flex: 1,backgroundColor:myColors.primary,marginRight: 10 }}
                            />
                            <Ionicons onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} name={isConfirmPasswordVisible ? "eye-off-outline" : 'eye-outline'} size={24} color="black" />
                        </View>

                        {/* Terms and conditions */}
                        <Text numberOfLines={2} style={{marginBottom:10, fontSize: 14, fontWeight: "400", color: "black", marginTop: 15, letterSpacing: 0.6, lineHeight: 22, opacity: 0.7 }}>
                            By continuing, you agree to our <Text style={{ color: "blue", fontWeight: "bold", opacity: 0.5 }}>terms of service and privacy policy</Text>
                        </Text>

                        {/* Sign Up Button */}
                        <AwesomeButton                                                 backgroundDarker={myColors.tertiary}
                                                                                       borderRadius={14}
                                                                   textSize={18} width={windowWidth - 40} backgroundColor={myColors.clickable}>
                            Sign Up
                        </AwesomeButton>

                        {/* Already have an account and Login */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: '400', textAlign: 'center' }}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => nav.navigate('Login')}>
                                <Text style={{ color: myColors.clickable, fontSize: 16, fontWeight: '700', textAlign: 'center', marginLeft: 5 }}>
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
