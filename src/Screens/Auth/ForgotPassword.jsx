import React, { useState, useRef } from "react";
import { Image, ScrollView, StatusBar, Text, TextInput, View, TouchableOpacity, Alert, KeyboardAvoidingView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import { authentication } from "../../../Firebaseconfig";
import { myColors as color } from "../../Utils/MyColors";
import { ThemeContext } from "../../../contexts/ThemeContext";

const ForgotPassword = () => {
    const nav = useNavigation();
    const emailInputRef = useRef(null);
    const [email, setEmail] = useState("");
    const [theme] = React.useContext(ThemeContext);
    let myColors = color[theme.mode];
    const styles = getStyles(myColors);

    const resetPassword = () => {
        if (!email) {
            Alert.alert("Please enter your email.");
            return;
        }

        sendPasswordResetEmail(authentication, email)
            .then(() => {
                Alert.alert('Password reset email sent. Check your inbox.');
                nav.navigate('Login');
            })
            .catch(error => {
                Alert.alert('An error occurred. Please try again later.');
                console.error(error);
            });
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style={'light'} />
            <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}>

                    {/* Logo */}
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo.png')} />

                    {/* Forgot Password Section */}
                    <View style={styles.forgotPasswordSection}>
                        <Text style={styles.header}>Forgot Password</Text>
                        <Text style={styles.subHeader}>Enter your email to reset your password</Text>

                        {/* Email */}
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            ref={emailInputRef}
                            value={email}
                            onChangeText={(val) => setEmail(val)}
                            keyboardType={"email-address"}
                            style={styles.textInput}
                            onSubmitEditing={resetPassword}
                        />

                        {/* Reset Password Button */}
                        <TouchableOpacity onPress={resetPassword}>
                            <View style={styles.resetButton}>
                                <Text style={styles.resetButtonText}>Reset Password</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Back to Login */}
                        <View style={styles.backToLogin}>
                            <Text style={styles.backToLoginText}>Remembered your password?</Text>
                            <TouchableOpacity onPress={() => nav.navigate('Login')}>
                                <Text style={styles.loginLink}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    logo: {
        height: 120,
        width: 220,
        alignSelf: 'center',
    },
    forgotPasswordSection: {
        paddingHorizontal: 20,
        marginTop: 50,
    },
    header: {
        fontSize: 26,
        fontWeight: '700',
        color: myColors.text,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '400',
        color: myColors.text,
        marginTop: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: myColors.text,
        marginTop: 40,
    },
    textInput: {
        borderColor: myColors.grey,
        color: myColors.text,
        borderBottomWidth: 2,
        fontSize: 16,
        marginTop: 15,
    },
    resetButton: {
        backgroundColor: myColors.clickable,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10,
    },
    resetButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    backToLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    backToLoginText: {
        color: myColors.text,
        fontSize: 16,
        fontWeight: '400',
    },
    loginLink: {
        color: myColors.clickable,
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 5,
    },
});

export default ForgotPassword;
