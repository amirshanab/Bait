import {View, TextInput} from "react-native";
import React from "react";
import {responsiveHeight} from "react-native-responsive-dimensions";
import {Feather} from '@expo/vector-icons';
import {myColors} from "../Utils/MyColors";

const HomeSearch = () => {
    return (
        <View style={{
            backgroundColor: "#E3E3E3",
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
