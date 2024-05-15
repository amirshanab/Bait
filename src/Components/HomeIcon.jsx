import React from "react";
import {View,  TouchableOpacity, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {myColors as color} from "../Utils/MyColors";
import { ThemeContext} from "../../contexts/ThemeContext";
import {useContext} from "react";
import Logo from "./Logo";

const HomeIcon = ({style}) => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];

    return (
        <View style={[styles.container, style ]}>
            <TouchableOpacity onPress={() => alert('Menu')}>
                <Icon name="menu" size={30} color={myColors.text} />
            </TouchableOpacity>
            <Logo width={100} height={100} />
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

});

export default HomeIcon;
