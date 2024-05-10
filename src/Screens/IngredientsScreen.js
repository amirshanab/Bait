import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ingredientsData } from "../Utils/Data";
import { myColors as color } from "../Utils/MyColors";
import {addToCart} from "../../Redux/CartSlice";
import {useDispatch} from "react-redux";
import {ThemeContext} from "../../contexts/ThemeContext";
import Logo from "../Components/Logo";


export default function IngredientsScreen({ route }) {
    const [theme] = React.useContext(ThemeContext);
    let myColors = color[theme.mode];
    const { dishId, dishName } = route.params;
    const ingredients = ingredientsData[dishId] || [];
    const dispatch = useDispatch();


    // Function to handle adding an ingredient to the cart
    const handleAddToCart = (item) => {
        // Placeholder functionality - replace with your actual cart handling logic
        dispatch(addToCart({ img: item.img, name: item.ingredient, price: item.price }));

        console.log("Added to cart", item);

        // addToCart(item); // Uncomment and use your actual method to add items to the cart
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: myColors.primary,}]}>
            <Logo/>
            <View style={[styles.ing, {borderColor:myColors.text}]}>
                <Text style={[styles.header, {color: myColors.text,}]}>{dishName} Ingredients</Text>
            </View>
            <FlatList
                data={ingredients}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <View style={[styles.item ,{borderColor:myColors.text}]}>
                        <Image style={styles.ingredientImage} source={{uri: item.img}}/>
                        <View style={styles.ingredientDetails}>
                        <Text style={[styles.title, {color: myColors.text,}]}>{item.ingredient}: {item.quantity}</Text>
                        <Text style={[styles.price,{color: myColors.text,}]}>Price: ₪{item.price}</Text>
                        </View>
                        <TouchableOpacity style={[styles.addToCartButton,{backgroundColor: myColors.clickable,}]} onPress={() => handleAddToCart(item)}>
                            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,

        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logo: {
        width: 70,
        height: 70, // Adjust based on your Logo's aspect ratio
        resizeMode: 'contain',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',

        marginVertical: 20,
    },
    ing: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 0.5,


    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',

    },

    ingredientImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    ingredientDetails: {
        flex: 1,
        justifyContent: 'center', // Center the content vertically if desired
        paddingLeft: 20,
    },

    price: {
        fontSize: 16,
        fontWeight: '600',

    },
    addToCartButton: {

        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignSelf: 'center',
    },

    addToCartButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
