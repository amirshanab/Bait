import {View, Image} from "react-native";
import React from "react";

const HomeIcon = () => {
    return (
        <View style={{justifyContent:'center',alignItems:'center' }}>
            <Image style={{width:60,height:60}} source={require('../assets/logo.png')} />
        </View>
    );
}

export default HomeIcon;
