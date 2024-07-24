import React, { useState, useRef } from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Dimensions,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { authentication } from "../../../Firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { myColors as color } from "../../Utils/MyColors";
import Toast from "react-native-toast-message";
import AwesomeButton from "react-native-really-awesome-button";

import Logo from "../../Components/Logo";
import LoadingScreen from "../../Components/LoadingScreen";

const theme = { mode: 'light' };
let myColors = color[theme.mode];

const Login = ({ handleLoginSuccess }) => {
    const { width: windowWidth } = Dimensions.get('window');

    const nav = useNavigation(); // Get navigation object
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [loading, setLoading] = useState(false); // State to track loading
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    });
    const { email, password } = userCredentials;

    const styles = getStyles(myColors, windowWidth);

    const loginUser = async () => {
        setLoading(true); // Set loading to true when login is initiated

        try {
            await signInWithEmailAndPassword(authentication, email, password);

            handleLoginSuccess();
            Toast.show({
                type: 'success',
                text1: 'Logged in👋',
                text2: 'Login Successful! Welcome Back!',
            });
        } catch (error) {
            setLoading(false); // Set loading to false if there's an error
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                Alert.alert('Invalid email or password. Please try again.');
            } else {
                Alert.alert('An error occurred. Please try again later.');
            }
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style={'light'} />
            <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}>
                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        <View>
                            <Logo width={220} height={120} />
                            {/* Login Section */}
                            <View style={styles.loginSection}>
                                <Text style={styles.header}>Login</Text>
                                <Text style={styles.subHeader}>Enter your credentials to continue</Text>
                                {/* Email */}
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    ref={emailInputRef}
                                    value={email}
                                    onChangeText={(val) => setUserCredentials({ ...userCredentials, email: val })}
                                    keyboardType={"email-address"}
                                    style={styles.textInput}
                                    onSubmitEditing={() => passwordInputRef.current.focus()}
                                />
                                {/* Password */}
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        ref={passwordInputRef}
                                        value={password}
                                        onChangeText={(val) => setUserCredentials({ ...userCredentials, password: val })}
                                        secureTextEntry={isPasswordVisible}
                                        maxLength={20}
                                        keyboardType={"ascii-capable"}
                                        style={styles.passwordInput}
                                        onSubmitEditing={loginUser}
                                    />
                                    <Ionicons
                                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                        name={isPasswordVisible === true ? "eye-off-outline" : 'eye-outline'}
                                        size={24}
                                        color="black"
                                    />
                                </View>
                                {/* Forgot Password */}
                                <TouchableOpacity onPress={() => nav.navigate('ForgotPassword')}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                                {/* Login Button */}
                                <View style={styles.loginButtonContainer}>
                                    <AwesomeButton
                                        backgroundDarker={myColors.clickable}
                                        borderRadius={14}
                                        textSize={18}
                                        width={windowWidth - 40}
                                        backgroundColor={myColors.clickable}
                                        onPress={loginUser}>
                                        Login
                                    </AwesomeButton>
                                </View>
                                {/* Don't have an account */}
                                <View style={styles.signupContainer}>
                                    <Text style={styles.signupText}>Don't have an account?</Text>
                                    <TouchableOpacity onPress={() => nav.navigate('Signup')}>
                                        <Text style={styles.signupLink}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const getStyles = (myColors) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: myColors.primary,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 30,
        paddingBottom: 100,
    },
    loginSection: {
        paddingHorizontal: 20,
        marginTop: 50,
    },
    header: {
        color: 'black',
        fontSize: 26,
        fontWeight: '700',
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '400',
        color: 'grey',
        marginTop: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: 'grey',
        marginTop: 40,
    },
    textInput: {
        borderColor: myColors.grey,
        borderBottomWidth: 2,
        fontSize: 16,
        marginTop: 15,
    },
    passwordContainer: {
        borderColor: myColors.grey,
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    passwordInput: {
        fontSize: 17,
        marginTop: 15,
        flex: 0.9,
    },
    forgotPasswordText: {
        fontSize: 16,
        fontWeight: '400',
        color: myColors.clickable,
        marginTop: 20,
        textAlign: 'right',
    },
    loginButtonContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    signupText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    signupLink: {
        color: myColors.clickable,
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 5,
    },
});

export default Login;
