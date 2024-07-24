import {Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Platform, StatusBar} from "react-native";
import React, {useContext} from "react";
import {Ionicons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {myColors as color} from "../Utils/MyColors";
import {useNavigation} from "@react-navigation/native";
import {addToCart} from "../../Redux/CartSlice";
import { useDispatch } from "react-redux";
import {ThemeContext} from "../../contexts/ThemeContext";

const ProductDetailsPopup = ({route}) => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    const dispatch = useDispatch();
    const productData = route.params.main;
    console.log(productData)
    const {name, price, img} = productData

    const nav = useNavigation();
    const styles = getStyles(myColors)
    return (
        <SafeAreaView style={styles.Main }>
            {/* Product image */}
            <View>
                <Image
                    style={{
                        resizeMode: "contain",
                        height: 300,
                        width: "100%",
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    }}
                    source={{uri: img}}
                />

                {/* Header with back button and share button */}
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    position: "absolute",
                    width: "100%",
                    paddingHorizontal: 15,
                    alignItems: "center",
                }}>
                    {/* Back button */}
                    <Ionicons
                        onPress={() => {
                            nav.goBack(); // Go back to the previous screen
                        }}
                        name="chevron-back"
                        size={28}
                        color={myColors.text}
                    />
                    {/* Share button */}
                    <MaterialIcons name="ios-share" size={28} color={myColors.text}/>
                </View>
            </View>

            {/* Product name */}
            <View style={{paddingHorizontal: 15}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {/* Product name */}
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 10,
                        color: myColors.text
                    }}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Text>
                    {/* Favorite button */}
                    <MaterialIcons name="favorite-border" size={30} color="black"/>
                </View>

                {/* Product price */}
                <Text style={{marginTop: 15, color: "grey"}}>Price: ₪{price}</Text>

                {/* Add to cart button */}
                <TouchableOpacity
                    onPress={() => {
                        dispatch(addToCart(productData));
                        nav.navigate('Cart');
                    }}

                    style={{
                        backgroundColor: myColors.clickable,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        marginTop: 20,
                        alignItems: 'center'
                    }}>
                    <Text style={{color: 'white', fontSize: 24}}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const getStyles = (myColors) => StyleSheet.create({
    Main : {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1, gap: 20,
        backgroundColor: myColors.primary
    }
})

export default ProductDetailsPopup;
