import {FlatList, Image, Text, View} from "react-native";
import React from "react";
import {fruits} from "../Utils/Data";
import {responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";


const IndividualProductCarousel = () => {
    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={fruits}
                renderItem={({item, index}) => (
                    <View style={{
                        height: responsiveHeight(20),
                        borderWidth: 2,
                        borderColor: "#E3E3E3",
                        width: responsiveWidth(30),
                        marginRight: 15,
                        borderRadius: 10,

                    }}
                    >
                        <Image style={{height: 125, resizeMode: "contain"}} source={{uri: item.img}}/>
                        <View style={{paddingHorizontal: 10}}>

                            <Text style={{
                                fontSize: 18,
                                fontWeight: "bold"
                            }}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>


                        </View>

                    </View>
                )}/>
        </View>
    )
}


export default IndividualProductCarousel;
