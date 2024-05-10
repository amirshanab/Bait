import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import { myColors as color } from "../Utils/MyColors";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { signOut } from "firebase/auth"; // Import signOut function from Firebase Authentication
import { authentication } from "../../Firebaseconfig";
import { useUser } from '../../contexts/UserContext';
import Toast from 'react-native-toast-message';
import Logo from "../Components/Logo";

const UserProfile = () => {
    const [loading,isLoading] = useState(false);
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    const { user } = useUser();

    const nav = useNavigation();
    // Placeholder for user information - replace with actual data retrieval logic
    const userInfo = {
        name: user.name,
        email: user.email,
    };

    const handleSignOut = () => {
isLoading(true);
        signOut(authentication)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Sign Out👋',
                    text2: 'You have been signed out successfully, Come back later!',


                    style: { height: 1250, width: 300, backgroundColor: 'rgba(0, 0, 0, 0.8)' }, // Adjust the style of the toast message container

                });
                console.log('signed out');
            })
            .catch(error => {
                isLoading(false);
                console.error("Error signing out: ", error);
            });
    };
    // console.log(myColors.primary);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: myColors.primary,}]}>
            <ScrollView style={styles.container}>
                {/* Header Logo */}
                <Logo/>

                {/* User Information */}
                <View style={styles.userInfoSection}>
                    <Text style={[styles.userName, {color: myColors.text}]}>{userInfo.name}</Text>
                    <Text style={[styles.userEmail, {color: myColors.text}]}>{userInfo.email}</Text>
                </View>

                {/* User Actions */}
                <View style={styles.userActions}>
                    <TouchableOpacity onPress={() => {
                        nav.navigate('MyOrders')
                    }} style={[styles.actionButton, {backgroundColor: myColors.tertiary,}]}>
                        <Text style={[styles.actionButtonText, {color: myColors.text}]}>My Orders</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                    }} style={[styles.actionButton, {backgroundColor: myColors.tertiary,}]}>
                        <Text style={[styles.actionButtonText, {color: myColors.text}]}>My Addresses</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        nav.navigate('PaymentMethods')
                    }} style={[styles.actionButton, {backgroundColor: myColors.tertiary,}]}>
                        <Text style={[styles.actionButtonText, {color: myColors.text}]}>Payment Methods</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        nav.navigate('Settings')
                    }} style={[styles.actionButton, {backgroundColor: myColors.tertiary,}]}>
                        <Text style={[styles.actionButtonText, {color: myColors.text}]}>App Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSignOut} disabled={loading} style={[styles.signOutButton, {opacity: loading ? 0.5 : 1}]}>
                        {/* Show loading indicator if loading is true */}
                        {loading ? (
                            <ActivityIndicator color={myColors.text} />
                        ) : (
                            <Text style={[styles.signOutButtonText, {color: myColors.text,}]}>Sign Out</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    logo: {
        width: 150,
        height: 150,
    },
    userInfoSection: {
        alignItems: 'center',
        marginTop: 30,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 18,
    },
    userActions: {
        marginTop: 50,
    },
    actionButton: {

        padding: 15,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 18,

    },
    signOutButton: {
        backgroundColor: 'rgba(255,68,68,0.85)',
        padding: 15,
        marginHorizontal: 20,
        marginTop: 50,
        borderRadius: 5,
        alignItems: 'center',
    },
    signOutButtonText: {
        fontWeight: '600',
        fontSize: 18,

    },
});

export default UserProfile;
