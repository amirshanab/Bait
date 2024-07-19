import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import React, {useContext} from "react";
import {responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import {useNavigation} from "@react-navigation/native";
import {myColors as color} from "../Utils/MyColors";
import {ThemeContext} from "../../contexts/ThemeContext";
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure you have this package installed

const IndividualProductCarousel = ({data,seeMore = true}) => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    const nav = useNavigation();

    const extendedData = seeMore ? [...data.slice(0, 5), { seeMore: true }] : data.slice(0, 5);
    const navigateToCategoryProducts = (categoryName) => {
        nav.navigate("CategoryProducts", {categoryName});
    };
    return (
        <View>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={extendedData}
                renderItem={({item}) => (
                    item.seeMore ? (
                        // See More card
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                backgroundColor: myColors.white,
                                height: responsiveHeight(23),
                                borderWidth: 2,
                                borderColor: myColors.white,
                                width: responsiveWidth(35),
                                marginRight: 10,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                // Navigate to the product listing screen or perform any desired action
                                navigateToCategoryProducts(extendedData[1].Category.split('/')[2])
                            }}
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: myColors.text,
                                marginBottom: 10
                            }}>See More</Text>
                            <Icon name="angle-double-right" size={30} color={myColors.text}/>
                        </TouchableOpacity>
                    ) : (
                        // Product card
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                height: responsiveHeight(23),
                                borderWidth: 2,
                                borderColor: myColors.white,
                                width: responsiveWidth(35),
                                marginRight: 10,
                                borderRadius: 10,
                            }}
                        >
                            <Image style={{height: 100, borderRadius: 40, resizeMode: "contain", marginVertical: 10}}
                                   source={{uri: item.Image}}/>
                            <View style={{paddingHorizontal: 10}}>
                                {/* Product name */}
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    height: 40,
                                    color: myColors.text
                                }}>{item.Name}</Text>
                                {/* Product price */}
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: 1
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: myColors.text
                                    }}>₪{item.Price} {item.Scale ? 'per Kg' : ''}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                )}
            />
        </View>
    );
}

export default IndividualProductCarousel;
