import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import {useNavigation} from "@react-navigation/native";
import {myColors as color} from "../Utils/MyColors";
import {ThemeContext} from "../../contexts/ThemeContext";
import {useContext} from "react";

const IndividualProductCarousel = ({data}) => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    const nav = useNavigation();
    return (
        <View>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({item, index}) => (
                    // product card
                    <TouchableOpacity

                        activeOpacity={0.7}
                        style={{
                            backgroundColor:myColors.white,
                            height: responsiveHeight(23),
                            borderWidth: 2,
                            borderColor: myColors.white,
                            width: responsiveWidth(35),
                            marginRight: 10,
                            borderRadius: 10,


                        }}
                    >
                        <Image style={{height: 100,borderRadius:30,resizeMode: "contain", marginVertical:10}} source={{uri: item.Image}}/>
                        <View style={{paddingHorizontal: 10}}>
                            {/* product name */}
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "600",
                                height: 40,
                                color:myColors.text
                            }}>{item.Name}</Text>
                            {/* product price */}


                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 1
                            }}>
                                <Text style={{fontSize: 15, fontWeight: 'bold', color:myColors.text}}>₪{item.Price} {item.Scale ? 'per Kg' : ''}</Text>

                            </View>
                        </View>

                    </TouchableOpacity>
                )}/>
        </View>
    )
}


export default IndividualProductCarousel;
