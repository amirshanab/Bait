import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import ProductServices from "../../Services/ProductServices";

const CategoryProducts = () => {
    const route = useRoute();
    const { categoryName } = route.params;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await ProductServices(categoryName);
                setProducts(productData);
                console.log(productData)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);

    const renderProductItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log("Product clicked:", item)}>
            <View style={styles.card}>
                <Image source={{ uri: item.Image }} style={styles.image} />
                <Text style={styles.productName}>{item.Name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    card: {
        flex: 1,
        margin: 5,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 5,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    flatListContent: {
        alignItems: "center",
    },
});

export default CategoryProducts;
