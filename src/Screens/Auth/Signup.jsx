import React, {useState, useRef, useContext} from "react";
import { Image, ScrollView, StatusBar, Text, TextInput, View, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../../Firebaseconfig";
import {myColors as color } from "../../Utils/MyColors";
import {ThemeContext} from "../../../contexts/ThemeContext";



const Signup = () => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];

    const nav = useNavigation(); // Get navigation object
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const { email, password, confirmPassword } = userCredentials;

    const userAccount = () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords don't match");
            return;
        }

        createUserWithEmailAndPassword(authentication, email, password)
            .then(() => {
                Alert.alert('User account created & signed in!');
                nav.navigate('Login');
            })
            .catch(error => {
                if (error.code === 'authentication/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }

                if (error.code === 'authentication/invalid-email') {
                    Alert.alert('That email address is invalid!');
                }
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
                        style={{ height: 120, width: 220, alignSelf: 'center' }}
                        source={require('../../assets/logo.png')} />


                    {/* Sign Up Section */}
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                        <Text style={{ color: 'black', fontSize: 26, fontWeight: '700' }}>Sign Up</Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 5 }}>Enter your credentials to continue</Text>

                        {/* Username */}
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }}>Username</Text>
                        <TextInput maxLength={10} keyboardType={"name-phone-pad"} style={{
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
