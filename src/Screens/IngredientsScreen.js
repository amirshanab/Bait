import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { ingredientsData, recipeStepsData } from "../Utils/Data";
import {myColors, myColors as color} from "../Utils/MyColors";
import { addToCart } from "../../Redux/CartSlice";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../../contexts/ThemeContext";
import Logo from "../Components/Logo";
import { FontAwesome } from '@expo/vector-icons';

export default function IngredientsScreen({ route }) {
    const [theme] = React.useContext(ThemeContext);
    let myColors = color[theme.mode];
    const { dishId, dishName } = route.params;
    const ingredients = ingredientsData[dishId] || [];
    const recipeSteps = recipeStepsData[dishId] || [];
    const dispatch = useDispatch();
    const sheetRef = useRef(null);
    const [sheetIndex, setSheetIndex] = useState(0); // Start with the sheet closed
    const snapPoints = ['25%', '50%', '90%'];

    // Function to handle adding an ingredient to the cart
    const handleAddToCart = (item) => {
        dispatch(addToCart({ img: item.img, name: item.ingredient, price: item.price }));
        console.log("Added to cart", item);
    };

    // Render the content of the bottom sheet
    const renderContent = () => (
        <View style={[styles.bottomSheetContent, { backgroundColor: myColors.primary }]}>
            <Text style={[styles.header, { color: myColors.text }]}>Recipe Steps</Text>
            <FlatList
                data={recipeSteps}
                keyExtractor={item => item.stepNumber.toString()}
                renderItem={({ item }) => (
                    <View style={styles.step}>
                        <Text style={[styles.stepNumber, { color: myColors.text }]}>Step {item.stepNumber}</Text>
                        <Text style={[styles.stepDescription, { color: myColors.text }]}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: myColors.primary }]}>
            <Logo />
            <View style={[styles.ing, { borderColor: myColors.text }]}>
                <Text style={[styles.header, { color: myColors.text }]}>{dishName} Ingredients</Text>
            </View>
            <FlatList
                data={ingredients}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.item, { borderColor: myColors.text }]}>
                        <Image style={styles.ingredientImage} source={{ uri: item.img }} />
                        <View style={styles.ingredientDetails}>
                            <Text style={[styles.title, { color: myColors.text }]}>{item.ingredient}: {item.quantity}</Text>
                            <Text style={[styles.price, { color: myColors.text }]}>Price: ₪{item.price}</Text>
                        </View>
                        <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: myColors.clickable }]} onPress={() => handleAddToCart(item)}>
                            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.arrowButton}
                onPress={() => setSheetIndex(sheetIndex === 0 ? 1 : 0)} // Toggle bottom sheet
            >
                <FontAwesome name="book" size={30} color={myColors.clickable} />
            </TouchableOpacity>
            <BottomSheet
                ref={sheetRef}
                index={sheetIndex}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onChange={(index) => setSheetIndex(index)}
            >
                {renderContent()}
            </BottomSheet>
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
        height: 70,
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
        justifyContent: 'center',
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
    bottomSheetContent: {
        flex: 1,
        padding: 20,
    },
    step: {
        marginBottom: 15,
    },
    stepNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    stepDescription: {
        fontSize: 16,
    },
    arrowButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 10,
        zIndex: 0, // Ensure the arrow button is above other components
    },
});
