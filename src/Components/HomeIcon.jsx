import React from "react";
import {View, Image, TouchableOpacity, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you're using MaterialIcons

const HomeIcon = ({style}) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={() => alert('Menu')}>
                <Icon name="menu" size={30} color="#000" />
            </TouchableOpacity>
            <Image style={[styles.logo, style]} source={require('../assets/logo.png')} />
            <TouchableOpacity onPress={() => alert('Search')}>
                <Icon name="search" size={30} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 80, // Default size, will be overridden by dynamic style
        height: 80, // Default size, will be overridden by dynamic style
    },
});

export default HomeIcon;
