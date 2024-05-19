import React, { useRef, useContext, useEffect, useState, useCallback } from "react";
import { Animated, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { myColors as color } from "../Utils/MyColors";
import HomeIcon from "../Components/HomeIcon";
import ProductsTitle from "../Components/ProductsTitle";
import PromotionsCarousel from "../Components/PromotionsCarousel";
import AllCategoriesCarousel from "../Components/AllCategoriesCarousel";
import IndividualProductCarousel from "../Components/IndividualProductCarousel";
import { ThemeContext } from "../../contexts/ThemeContext";
import ProductServices from "../../Services/ProductServices";

// Optimized IndividualProductCarousel using React.memo
const MemoizedIndividualProductCarousel = React.memo(IndividualProductCarousel);

// Optimized PromotionsCarousel using React.memo
const MemoizedPromotionsCarousel = React.memo(PromotionsCarousel);

// Optimized AllCategoriesCarousel using React.memo
const MemoizedAllCategoriesCarousel = React.memo(AllCategoriesCarousel);

// Optimized ProductsTitle using React.memo
const MemoizedProductsTitle = React.memo(ProductsTitle);

const Home = () => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];

    const scrollY = useRef(new Animated.Value(0)).current; // Use useRef to persist value across re-renders

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [130, 80], // Original height to minimized height
        extrapolate: 'clamp',
    });

    const backgroundColor = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [myColors.primary, myColors.primary], // Color transition
        extrapolate: 'clamp',
    });

    // Memoized callback to fetch product data
    const fetchProductData = useCallback((category) => {
        return ProductServices(category);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
            {/* Wrap the header with SafeAreaView to avoid content overlapping the status bar */}
            <StatusBar style={theme} />
            <SafeAreaView style={{ zIndex: 1 }}>
                <Animated.View style={{
                    height: headerHeight,
                    backgroundColor,
                    borderBottomWidth: 0.5, // might want to remove
                    borderColor: myColors.text,
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                }}>
                    <HomeIcon />
                </Animated.View>
            </SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 50, paddingTop: 0 }} // Adjust based on initial header height to avoid overlapping content
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false } // Use native driver for better performance where possible
                )}
                scrollEventThrottle={10}
            >
                <View style={styles.contentContainer}>
                    <MemoizedPromotionsCarousel />
                    <MemoizedAllCategoriesCarousel />
                    <MemoizedProductsTitle title='Fruits' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Fruits').slice(0, 5)} />
                    <MemoizedProductsTitle title='Vegetables' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Vegetables')} />
                    <MemoizedProductsTitle title='Bakery' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Bakery')} />
                    <MemoizedProductsTitle title='Meats and Fish' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Meats')} />
                    <MemoizedProductsTitle title="Beauty and baby" />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Beauty and baby')} />
                    <MemoizedProductsTitle title='Beverages' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Beverages')} />
                    <MemoizedProductsTitle title='Cleaning' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Cleaning')} />
                    <MemoizedProductsTitle title='Dairy' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Dairy')} />
                    <MemoizedProductsTitle title='Pets' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Pets')} />
                    <MemoizedProductsTitle title='Sweets and Snacks' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Sweets and snacks')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 5,
        paddingBottom: 20,
        paddingTop: 90,
        gap: 10,
    },
});

export default Home;
