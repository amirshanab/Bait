import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Ionicons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {myColors} from "../Utils/MyColors";
import {useNavigation} from "@react-navigation/native";

const ProductDetailsPopup = ({route}) => {
    const {name, price, img} = route.params.main; // Get the product details from the route params

    const nav = useNavigation(); // Access the navigation object
    // Function to handle adding the product to the cart
    const handleAddToCart = () => {
        // Logic to add the product to the cart goes here
        console.log("Product added to cart");
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: myColors.primary, gap: 20}}>
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
                        color="black"
                    />
                    {/* Share button */}
                    <MaterialIcons name="ios-share" size={28} color="black"/>
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
                        color: 'black'
                    }}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Text>
                    {/* Favorite button */}
                    <MaterialIcons name="favorite-border" size={30} color="black"/>
                </View>

                {/* Product price */}
                <Text style={{marginTop: 15, color: "grey"}}>Price: {price}₪</Text>

                {/* Add to cart button */}
                <TouchableOpacity
                    onPress={handleAddToCart}
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

export default ProductDetailsPopup;
