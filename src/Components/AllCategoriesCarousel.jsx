import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import Categories from "../../Services/CategoryServices";
import { useNavigation } from "@react-navigation/native";
import { myColors as color } from "../Utils/MyColors";
import { ThemeContext } from "../../contexts/ThemeContext";

const AllCategoriesCarousel = () => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];

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
                <Image source={{ uri: item.Image }} style={styles.image} />
                <Text style={[styles.productTitle, { color: myColors.text }]}>{item.Name}</Text>
            </View>
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                horizontal={true}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 23,
    },
    productItem: {
        width: 150,
        marginRight: 1,
       // alignItems: "center",
    },
    image: {
        resizeMode: 'cover',
        width: 120,
        height: 120,
        borderRadius: 25,
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 18,
        fontFamily : 'System',
      //  textAlign: 'center',
    },
    flatListContent: {
    },

});

export default AllCategoriesCarousel;
