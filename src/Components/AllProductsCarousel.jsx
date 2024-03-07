import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import Categories from "../../Services/CategoryServices";
import { useNavigation } from "@react-navigation/native";
import {myColors} from "../Utils/MyColors";

const AllProductsCarousel = () => {
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await Categories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, []);

    const navigateToCategoryProducts = (categoryName) => {
        navigation.navigate("CategoryProducts", { categoryName });
    };

    const renderProductItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigateToCategoryProducts(item.Name)}>
            <View style={styles.productItem}>
                {/* Image */}
                <Image source={{ uri: item.Image }} style={styles.image} />
                {/* Product title */}
                <Text style={styles.productTitle}>{item.Name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: myColors.back,
    },
    productItem: {
        marginRight: 10,
        alignItems: "center",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 25,
        marginBottom: 5,
    },
    productTitle: {
        fontSize: 12,
    },
    flatListContent: {
        alignItems: "flex-start",
    },
});

export default AllProductsCarousel;
