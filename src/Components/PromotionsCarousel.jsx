import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const mockPromotions = [
    { id: 1, title: "Promotion 1", description: "Description for Promotion 1" },
    { id: 2, title: "Promotion 2", description: "Description for Promotion 2" },
    { id: 3, title: "Promotion 3", description: "Description for Promotion 3" },
    { id: 4, title: "Promotion 4", description: "Description for Promotion 4" },
    { id: 5, title: "Promotion 5", description: "Description for Promotion 5" },
];

const PromotionsCarousel = () => {
    const renderPromotionItem = ({ item }) => (
        <View style={styles.promotionItem}>
            <Text style={styles.promotionTitle}>{item.title}</Text>
            <Text style={styles.promotionDescription}>{item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={mockPromotions}
                renderItem={renderPromotionItem}
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
    carouselTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    promotionItem: {
        marginRight: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
        width: 300, // Adjust width to make items bigger
        height: 200, // Adjust height to make items bigger
    },
    promotionTitle: {
        fontSize: 20, // Increase font size for title
        fontWeight: "bold",
    },
    promotionDescription: {
        fontSize: 16, // Increase font size for description
    },
    flatListContent: {
        alignItems: "flex-start",
    },
});

export default PromotionsCarousel;
