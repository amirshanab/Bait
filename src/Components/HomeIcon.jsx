import React from "react";
import {View, Image, TouchableOpacity, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {myColors as color} from "../Utils/MyColors";
import { ThemeContext} from "../../contexts/ThemeContext";
import {useContext} from "react";

const HomeIcon = ({style}) => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];

    return (
        <View style={[styles.container, style ]}>
            <TouchableOpacity onPress={() => alert('Menu')}>
                <Icon name="menu" size={30} color={myColors.text} />
            </TouchableOpacity>
            <Image style={[styles.logo, style]} source={require('../assets/logo.png')} />
            <TouchableOpacity onPress={() => alert('Search')}>
                <Icon name="search" size={30} color={myColors.text} />
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
        width: 90, // Default size, will be overridden by dynamic style
        height: 90, // Default size, will be overridden by dynamic style
    },
});

export default HomeIcon;
