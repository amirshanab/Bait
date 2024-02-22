import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Mock data for demonstration
const mockProducts = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
}));

const AllProductsCarousel = () => {
    // Function to render each product item
    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            {/* Larger circle for product */}
            <View style={styles.circle} />
            {/* Product title */}
            <Text style={styles.productTitle}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* FlatList to render products */}
            <FlatList
                data={mockProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
    },
    productItem: {
        marginRight: 10,
        alignItems: "center",
    },
    circle: {
        width: 66, // Increase circle diameter
        height: 66, // Increase circle diameter
        borderRadius: 25, // Make it a perfect circle
        backgroundColor: "#f0f0f0",
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
