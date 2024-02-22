import {FlatList, Image, Text, View} from "react-native";
import React from "react";
import {fruits} from "../Utils/Data";
import {responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import {Entypo} from '@expo/vector-icons';
import {myColors} from "../Utils/MyColors";


const IndividualProductCarousel = () => {
    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={fruits}
                renderItem={({item, index}) => (


                    // product card
                    <View style={{
                        height: responsiveHeight(22),
                        borderWidth: 2,
                        borderColor: "#E3E3E3",
                        width: responsiveWidth(30),
                        marginRight: 15,
                        borderRadius: 10,

                    }}
                    >
                        <Image style={{height: 125, resizeMode: "contain"}} source={{uri: item.img}}/>
                        <View style={{paddingHorizontal: 10}}>
                            {/* product name */}
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "600"
                            }}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                            {/* product price */}
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 18
                            }}>
                                <Text style={{fontSize: 14, fontWeight: 'bold'}}>₪ {item.price}</Text>
                                <Entypo name="squared-plus" size={33} color="#04AA6D"/>
                            </View>


                        </View>

                    </View>
                )}/>
        </View>
    )
}


export default IndividualProductCarousel;
