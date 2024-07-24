import React, { useRef, useState, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { myColors as color } from "../Utils/MyColors";
import { addToCart } from "../../Redux/CartSlice";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../../contexts/ThemeContext";
import Logo from "../Components/Logo";
import { FontAwesome } from '@expo/vector-icons';

export default function IngredientsScreen({ route }) {
    const [theme] = useContext(ThemeContext);
    const myColors = color[theme.mode];
    const { dish } = route.params;
    const styles = getStyles(myColors);

    console.log(dish)



    const dispatch = useDispatch();
    const sheetRef = useRef(null);
    const [sheetIndex, setSheetIndex] = useState(0); // Start with the sheet closed
    const snapPoints = ['25%', '50%', '90%'];

    const handleAddToCart = (item) => {
        dispatch(addToCart({ Image: item.Image, Name: item.Name, Price: item.Price,ID: item.ID,quantity: item.quantity }));
        console.log("Added to cart", item);
    };

    const renderContent = () => (
        <View style={styles.bottomSheetContent }>
            <Text style={styles.header   }>Recipe Steps</Text>
            <FlatList
                data={dish.description}
                renderItem={({ item }) => (
                    <View style={styles.step}>
                        <Text style={styles.stepDescription }>{dish.description}</Text>
                    </View>
                )}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.safe  }>
            <Logo />
            <View style={styles.ing}>
                <Text style={styles.header}>{dish.name} Ingredients</Text>
            </View>
            <FlatList
                data={dish.ingredients}
                keyExtractor={item => item.ID}
                renderItem={({ item }) => (
                    <View style={styles.item }>
                        <Image style={styles.ingredientImage} source={{ uri: item.Image }} />
                        <View style={styles.ingredientDetails}>
                            <Text style={styles.title}>{item.Name}: {item.quantity}</Text>
                            <Text style={styles.price }>Price: ₪{item.Price}</Text>
                        </View>
                        <TouchableOpacity style={styles.addToCartButton } onPress={() => handleAddToCart(item)}>
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

const getStyles = (myColors) => StyleSheet.create({
    safe: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: myColors.primary
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
        color: myColors.text
    },
    ing: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: myColors.text
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: myColors.text
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: myColors.text
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
        color: myColors.text
    },
    addToCartButton: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: myColors.clickable
    },
    addToCartButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottomSheetContent: {
        flex: 1,
        padding: 20,
        backgroundColor: myColors.primary
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
        color: myColors.text
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
