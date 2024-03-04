import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import ProductServices from "../../Services/ProductServices";
import { myColors } from "../Utils/MyColors";


const CategoryProducts = () => {
    const route = useRoute();
    const { categoryName } = route.params;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await ProductServices(categoryName);
                setProducts(productData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);

    const renderProductItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log("Product clicked:", item)}>
            <View style={styles.productItem}>
                <Image source={{ uri: item.Image }} style={styles.image} />
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.Name}</Text>
                    <View style={styles.quantityContainer}>
                        <Text style={styles.price}>₪ {(item.price)}</Text>
                        {/* Add to Cart Button */}
                        <TouchableOpacity style={styles.addToCartButton} onPress={() => console.log("Add to cart:", item)}>
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>{categoryName}</Text>
                </View>
                {/* Products */}
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.primary,
    },
    contentContainer: {
        flex: 1,
        padding: 15,
    },
    headerContainer: {
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: myColors.text,
        marginBottom: 10,
    },
    productItem: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: myColors.border,
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
        color: myColors.text,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        color: myColors.text,
        marginRight: 10,
    },
    addToCartButton: {
        backgroundColor: myColors.clickable,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    addToCartText: {
        fontSize: 12,
        color: 'white',
        fontWeight: "bold",
    },
    flatListContent: {
        paddingBottom: 20,
    },
});

export default CategoryProducts;
