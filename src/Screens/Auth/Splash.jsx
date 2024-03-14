import {Image, StatusBar, View} from "react-native";
import React, {useEffect} from "react";
import {myColors} from "../../Utils/MyColors";
import {useNavigation} from "@react-navigation/native";


const Splash = () => {
    const nav = useNavigation(); // Get navigation object

    useEffect(() => {
        const timeout = setTimeout(() => {
            nav.navigate('Login');
        }, 2000);



        return () => clearTimeout(timeout); // Clear the timeout on component unmount
    }, [nav]);
    return (
        <View style={{
            backgroundColor: myColors.primary,
            flex: 1,
            justifyContent: 'center'
        }}>

            <StatusBar style={'light'}/>
            <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                <Image
                    style={{ height: 120, width: 220, alignSelf: 'center' }}
                    source={require('../../assets/logo.png')} />
            </View>
        </View>
    );
}
export default Splash;
