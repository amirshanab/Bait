import {View, TextInput} from "react-native";
import React from "react";
import {responsiveHeight} from "react-native-responsive-dimensions";
import {Feather} from '@expo/vector-icons';
import {myColors as color } from "../Utils/MyColors";
import {ThemeContext} from "../../contexts/ThemeContext";
import {useContext} from "react";




const HomeSearch = () => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    return (
        <View style={{
            backgroundColor: myColors.white,
            height: responsiveHeight(5),
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            gap:5
        }}>
            <Feather name="search" size={24} color="black"/>
            <TextInput
                placeholder="Search"
                style={{fontSize: 18, marginLeft: 10,flex:1}}/>
        </View>
    );
}


export default HomeSearch;
