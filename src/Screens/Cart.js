import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {myColors} from "../Utils/MyColors";
import {responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import {AntDesign} from '@expo/vector-icons';

const Cart = () => {
    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 10, backgroundColor: myColors.primary, gap: 15}}>

            <Text style={{textAlign: 'center', fontSize: 23, fontWeight: "500"}}>My Cart</Text>

            {/* Parent container */}
            <View style={{
                height: responsiveHeight(22),
                borderBottomColor: "black",
                borderBottomWidth: 2,
                flexDirection: 'row',
                backgroundColor: 'yellow'
            }}>
                {/* child 1 the image */}
                <View style={{flex: 0.35, alignItems: "center", justifyContent: "center"}}>
                    <Image
                        style={{height: 130, width: 130, resizeMode: 'contain'}}
                        source={{uri: 'https://w7.pngwing.com/pngs/265/75/png-transparent-ipod-touch-apple-icon-format-icon-large-red-apples-closeup-of-red-apples-natural-foods-food-eating.png'}}/>
                </View>

                {/* child 2  */}
                <View style={{flex: 0.65, paddingHorizontal: 10, paddingVertical: 30}}>


                    {/* name and the remove product button  */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        {/* Product name */}
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Apple</Text>
                        {/* Remove product button */}
                        <AntDesign onPress={() => console.log("Remove product")} name="close" size={24} color="black"/>
                    </View>
                    {/* price and quantity */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                    </View>

                </View>

            </View>


        </SafeAreaView>
    );
}

export default Cart;
