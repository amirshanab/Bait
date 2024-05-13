import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/CartSlice';
import ProductServices from '../../Services/ProductServices';
import AddToCartAnimation from '../Components/AddToCartAnimation';
import {myColors as color} from '../Utils/MyColors';
import {ThemeContext} from "../../contexts/ThemeContext";
import {useProducts} from "../../contexts/ProductContext";

const CategoryProducts = () => {
    const [theme] = React.useContext(ThemeContext);
    let myColors = color[theme.mode];
    const route = useRoute();
    const navigation = useNavigation();
    const { categoryName } = route.params;
    const [products, setProducts] = useState([]);
    const [showAnimation, setShowAnimation] = useState(false);
    const [itemNameForAnimation, setItemNameForAnimation] = useState('');
    const dispatch = useDispatch();
    const Products = useProducts();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await ProductServices(categoryName);
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    const renderProductItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log('Product clicked:', item)}>
            <View style={[styles.productItem, {borderBottomColor: myColors.text,}]}>
                <Image source={{ uri: item.Image }} style={styles.image} />
                <View style={styles.productDetails}>
                    <Text style={[styles.productName, {color: myColors.text,}]}>{item.Name}</Text>
                    <View style={styles.quantityContainer}>
                        <Text style={[styles.price,{color: myColors.text,}]}>{`₪ ${item.Price}`}</Text>
                        <TouchableOpacity
                            style={[styles.addToCartButton,{backgroundColor: myColors.clickable,}]}
                            onPress={() => {
                                dispatch(addToCart({ img: item.Image, name: item.Name, price: item.Price }));
                                setItemNameForAnimation(item.Name);
                                setShowAnimation(true);
                                setTimeout(() => setShowAnimation(false), 2500); // Adjust timing as needed
                            }}>
                            <Text style={[styles.addToCartText,{color: myColors.white,}]}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: myColors.primary,}]}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={28} color={myColors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.header,{color: myColors.text,}]}>{categoryName}</Text>
                    <View style={styles.invisibleView} />
                </View>
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContent}
                />
                {showAnimation && <AddToCartAnimation itemName={itemNameForAnimation} />}
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    contentContainer: {
        flex: 1,
        padding: 20,
        paddingVertical: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Updated for balancing
        marginBottom: 40,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",

        textAlign: 'center', // Ensure the text aligns center
        flex: 1, // Take available space to enforce centering
    },
    invisibleView: {
        width: 28, // Match the back button's width
        height: 28, // Match the back button's height
    },

    productItem: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,

        paddingVertical: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
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

    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",

        marginRight: 10,
    },
    addToCartButton: {

        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    addToCartText: {
        fontSize: 12,

        fontWeight: "bold",
    },
    flatListContent: {
        paddingBottom: 20,
    },
});

export default CategoryProducts;
