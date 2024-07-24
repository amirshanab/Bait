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
import getRecommendations from "../../Services/getUserPurchasedItems";

//memo for better performance
const MemoizedIndividualProductCarousel = React.memo(IndividualProductCarousel);

const MemoizedPromotionsCarousel = React.memo(PromotionsCarousel);

const MemoizedAllCategoriesCarousel = React.memo(AllCategoriesCarousel);

const MemoizedProductsTitle = React.memo(ProductsTitle);

const Home = () => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];

    const [recommendedItems, setRecommendedItems] = useState([]);

    const scrollY = useRef(new Animated.Value(0)).current;
    //header animation
    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [130, 80],
        extrapolate: 'clamp',
    });

    const backgroundColor = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [myColors.primary, myColors.primary],
        extrapolate: 'clamp',
    });
    //fetch the products
    const fetchProductData = useCallback((category) => {
        return ProductServices(category);
    }, []);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const recommendations = await getRecommendations();
            setRecommendedItems(recommendations);

        };

        fetchRecommendations();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
            <StatusBar style={theme} />
            <SafeAreaView style={{ zIndex: 1 }}>
                <Animated.View style={{
                    height: headerHeight,
                    backgroundColor,
                    borderBottomWidth: 0.5,
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
                style={{ marginTop: 50, paddingTop: 0 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={10}
            >
                <View style={styles.contentContainer}>
                    <MemoizedPromotionsCarousel />
                    <MemoizedProductsTitle title='Categories' />
                    <MemoizedAllCategoriesCarousel />
                    <MemoizedProductsTitle title='Specials' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Fruits').slice(0, 5)} />
                    <MemoizedProductsTitle title='Daily Needs' />
                    <MemoizedIndividualProductCarousel data={fetchProductData('Vegetables')} />
                    <MemoizedProductsTitle title='Based on previous purchases' />
                    <MemoizedIndividualProductCarousel data={recommendedItems.length === 0 ? fetchProductData('Fruits') : recommendedItems} seeMore = {false} />
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
