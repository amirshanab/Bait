import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const mockProducts = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
}));

const AllProductsCarousel = () => {
    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <View style={styles.circle} />
            <Text style={styles.productTitle}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
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
        width: 40,
        height: 40,
        borderRadius: 20,
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
