import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import Categories from "../../Services/CategoryServices";
import { useNavigation } from "@react-navigation/native";
import { myColors as color} from "../Utils/MyColors";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";


const AllCategoriesCarousel = () => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];

    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;

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
                <Text style={[styles.productTitle, {color:myColors.text}]}>{item.Name}</Text>
            </View>
        </TouchableOpacity>
    );

    const indicatorWidth = scrollX.interpolate({
        inputRange: [0, categories.length * 100],
        outputRange: ["0%", "147%"],
        extrapolate: "clamp",
    });

    return (
        <View style={[styles.container, {backgroundColor: myColors.white}]}>
            <FlatList
                data={categories}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
            />
            <Animated.View style={[styles.scrollIndicator, { width: indicatorWidth }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 23,
    },
    productItem: {
        marginRight: 10,
        alignItems: "center",
    },
    image: {
        resizeMode: 'cover',
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
    scrollIndicator: {
        height: 4,
        backgroundColor: "#0097B2", // Change color as needed
        position: "absolute",
        bottom: 0,
        left: 0,
    },
});

export default AllCategoriesCarousel;
