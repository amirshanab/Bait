import React, { useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/CartSlice';
import AddToCartAnimation from '../Components/AddToCartAnimation';
import { myColors as color } from '../Utils/MyColors';
import { ThemeContext } from "../../contexts/ThemeContext";
import ProductServices from "../../Services/ProductServices";

const CategoryProducts = () => {
    const [theme] = useContext(ThemeContext);
    const myColors = color[theme.mode];
    const styles = getStyles(myColors);

    const route = useRoute();
    const navigation = useNavigation();
    const { categoryName } = route.params;
    const [showAnimation, setShowAnimation] = useState(false);
    const [itemNameForAnimation, setItemNameForAnimation] = useState('');
    const dispatch = useDispatch(); //dispatch from redux
    const filteredProducts = ProductServices(categoryName);

    const renderProductItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log('Product clicked:', item)} disabled={!item.Stock}>
            <View style={styles.productItem}>
                <Image source={{ uri: item.Image }} style={item.Stock ? styles.image : styles.outOfStockImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.Name}</Text>
                    <View style={styles.quantityContainer}>
                        <Text style={styles.price}>{`₪ ${item.Price}`}</Text>
                        {item.Stock ? (
                            <TouchableOpacity
                                style={styles.addToCartButton}
                                onPress={() => {
                                    //send the payload to the cart
                                    dispatch(addToCart({ Image: item.Image, Name: item.Name, Price: item.Price, Scale: item.Scale, ID: item.ID, Category: item.Category, quantity: 1 }));
                                    setItemNameForAnimation(item.Name);
                                    setShowAnimation(true);
                                    setTimeout(() => setShowAnimation(false), 2500);
                                }}>
                                <Text style={styles.addToCartText}>Add to Cart</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.outOfStockText}>Out of Stock</Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
    //back button
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={28} color={myColors.text} />
                    </TouchableOpacity>
                    <Text style={styles.header}>{categoryName}</Text>
                    <View style={styles.invisibleView} />
                </View>
                <FlatList
                    data={filteredProducts}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContent}
                    showsVerticalScrollIndicator={false}
                />
                {showAnimation && <AddToCartAnimation itemName={itemNameForAnimation} />}
            </View>
        </SafeAreaView>
    );
};

const getStyles = (myColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.primary,
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        paddingVertical: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        flex: 1,
        color: myColors.text,
    },
    invisibleView: {
        width: 28,
        height: 28,
    },
    productItem: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: myColors.text,
        paddingVertical: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    outOfStockImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
        opacity: 0.4,
    },
    productDetails: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: myColors.text,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
        color: myColors.text,
    },
    addToCartButton: {
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: myColors.clickable,
    },
    addToCartText: {
        fontSize: 12,
        fontWeight: "bold",
        color: myColors.white,
    },
    flatListContent: {
        paddingBottom: 20,
    },
    outOfStockText: {
        fontSize: 14,
        fontWeight: "bold",
        color: 'red',
    },
});

export default CategoryProducts;
