import React, { useState, useRef } from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    View,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Dimensions,
    StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from "../../../Firebaseconfig";
import { myColors as color } from "../../Utils/MyColors";
import Logo from "../../Components/Logo";
import { doc, setDoc } from "firebase/firestore";
import { TextInput as PaperTextInput } from 'react-native-paper';
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
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style={'light'} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                    {/* Logo */}
                    <Logo width={150} height={80} />

                    {/* Sign Up Section */}
                    <View style={styles.signUpSection}>
                        <Text style={styles.signUpText}>Sign Up</Text>
                        <Text style={styles.enterCredentialsText}>Enter your credentials to continue</Text>

                        {/* Name */}
                        <PaperTextInput
                            ref={nameInputRef}
                            value={name}
                            mode={"outlined"}
                            activeOutlineColor={'black'}
                            outlineColor={'black'}
                            textColor={myColors.text}
                            label={'Name'}
                            maxLength={20}
                            onChangeText={(val) => setUserCredentials({ ...userCredentials, name: val })}
                            style={styles.textInput}
                        />

                        {/* Email */}
                        <PaperTextInput
                            ref={emailInputRef}
                            value={email}
                            mode={"outlined"}
                            textColor={myColors.text}
                            activeOutlineColor={'black'}
                            outlineColor={'black'}
                            label={'Email'}
                            onChangeText={(val) => setUserCredentials({ ...userCredentials, email: val })}
                            keyboardType={"email-address"}
                            style={[styles.textInput, styles.emailInput]}
                        />

                        {/* Phone Number */}
                        <PaperTextInput
                            ref={phoneNumberInputRef}
                            value={phoneNumber}
                            textColor={myColors.text}
                            mode={"outlined"}
                            activeOutlineColor={'black'}
                            outlineColor={'black'}
                            label={'Phone Number'}
                            onChangeText={(val) => setUserCredentials({ ...userCredentials, phoneNumber: val })}
                            keyboardType={"phone-pad"}
                            style={styles.textInput}
                            onSubmitEditing={() => userAccount()}
                        />

                        {/* Password */}
                        <View style={styles.passwordContainer}>
                            <PaperTextInput
                                ref={passwordInputRef}
                                value={password}
                                textColor={myColors.text}
                                activeOutlineColor={'black'}
                                outlineColor={'black'}
                                mode={"outlined"}
                                label={'Password'}
                                onChangeText={(val) => setUserCredentials({ ...userCredentials, password: val })}
                                secureTextEntry={isPasswordVisible}
                                maxLength={20}
                                style={[styles.textInput, styles.passwordInput]}
                            />
                            <Ionicons onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                      name={isPasswordVisible ? "eye-off-outline" : 'eye-outline'} size={24}
                                      color="black" style={styles.icon} />
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.passwordContainer}>
                            <PaperTextInput
                                ref={confirmPasswordInputRef}
                                value={confirmPassword}
                                activeOutlineColor={'black'}
                                outlineColor={'black'}
                                mode={"outlined"}
                                textColor={myColors.text}
                                label={'Confirm Password'}
                                onChangeText={(val) => setUserCredentials({ ...userCredentials, confirmPassword: val })}
                                secureTextEntry={isConfirmPasswordVisible}
                                maxLength={20}
                                style={[styles.textInput, styles.passwordInput]}
                            />
                            <Ionicons onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                      name={isConfirmPasswordVisible ? "eye-off-outline" : 'eye-outline'} size={24}
                                      color="black" />
                        </View>

                        {/* Terms and conditions */}
                        <Text numberOfLines={2} style={styles.termsText}>
                            By continuing, you agree to our <Text
                            style={styles.termsLink}>terms of service and privacy policy</Text>
                        </Text>

                        {/* Sign Up Button */}
                        <AwesomeButton backgroundDarker={myColors.clickable}
                                       borderRadius={14}
                                       textSize={18} width={windowWidth - 40} backgroundColor={myColors.clickable} onPress={() => userAccount()}>
                            Sign Up
                        </AwesomeButton>

                        {/* Already have an account and Login */}
                        <View style={styles.loginContainer}>
                            <Text style={styles.alreadyHaveAccountText}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => nav.navigate('Login')}>
                                <Text style={styles.loginText}>
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

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: myColors.primary,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 30,
        paddingBottom: 100,
    },
    signUpSection: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    signUpText: {
        color: 'black',
        fontSize: 26,
        fontWeight: '700',
    },
    enterCredentialsText: {
        fontSize: 16,
        fontWeight: '400',
        color: 'grey',
        marginTop: 5,
    },
    textInput: {
        marginTop: 20,
        backgroundColor: myColors.primary,
    },
    emailInput: {
        marginTop: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    passwordInput: {
        flex: 1,
        backgroundColor: myColors.primary,
        marginRight: 10,
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    termsText: {
        marginBottom: 10,
        fontSize: 14,
        fontWeight: "400",
        color: "black",
        marginTop: 15,
        letterSpacing: 0.6,
        lineHeight: 22,
        opacity: 0.7,
    },
    termsLink: {
        color: "blue",
        fontWeight: "bold",
        opacity: 0.5,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    alreadyHaveAccountText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    },
    loginText: {
        color: myColors.clickable,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginLeft: 5,
    },
});

export default Signup;
