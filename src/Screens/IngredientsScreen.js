import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ingredientsData } from "../Utils/Data";
import { myColors } from "../Utils/MyColors";
// Import your method for adding items to the cart
// import { addToCart } from '../path/to/your/cartManagementSystem';

export default function IngredientsScreen({ route }) {
    const { dishId, dishName } = route.params;
    const ingredients = ingredientsData[dishId] || [];

    // Function to handle adding an ingredient to the cart
    const handleAddToCart = (item) => {
        // Placeholder functionality - replace with your actual cart handling logic
        console.log("Added to cart", item);
        // addToCart(item); // Uncomment and use your actual method to add items to the cart
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')}/>
            </View>
            <View style={styles.ing}>
                <Text style={styles.header}>{dishName} Ingredients</Text>
            </View>
            <FlatList
                data={ingredients}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Image style={styles.ingredientImage} source={{uri: item.img}}/>
                        <View style={styles.ingredientDetails}>
                        <Text style={styles.title}>{item.ingredient}: {item.quantity}</Text>
                        <Text style={styles.price}>Price: ₪{item.price}</Text>
                        </View>
                        <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
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
        backgroundColor: myColors.primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logo: {
        width: 70,
        height: 70, // Adjust based on your logo's aspect ratio
        resizeMode: 'contain',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: myColors.text,
        marginVertical: 20,
    },
    ing: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor:'black',

    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: myColors.tertiary,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: myColors.text,
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
        color: myColors.text,
    },
    addToCartButton: {
        backgroundColor: myColors.clickable,
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
