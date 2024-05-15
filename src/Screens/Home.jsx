import React, {useRef, useContext, useEffect, useState} from "react";
import {Animated, SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import { myColors as color } from "../Utils/MyColors";
import HomeIcon from "../Components/HomeIcon";
import ProductsTitle from "../Components/ProductsTitle";
import PromotionsCarousel from "../Components/PromotionsCarousel";
import AllCategoriesCarousel from "../Components/AllCategoriesCarousel";
import IndividualProductCarousel from "../Components/IndividualProductCarousel";
import { fruits } from "../Utils/Data";
import {ThemeContext} from "../../contexts/ThemeContext";
import ProductServices from "../../Services/ProductServices";

const Home = () => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    // const [products, setProducts] = useState([]);
    // //setProducts(ProductServices('Fruits'))

    const scrollY = useRef(new Animated.Value(0)).current; // Use useRef to persist value across re-renders

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [130, 50], // Original height to minimized height
        extrapolate: 'clamp',
    });

    const backgroundColor = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [myColors.primary, myColors.primary], // Color transition
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: myColors.primary}}>
            {/* Wrap the header with SafeAreaView to avoid content overlapping the status bar */}
            <StatusBar style={theme} />
            <SafeAreaView style={{zIndex: 1}}>
                <Animated.View style={{
                    height: headerHeight,
                    backgroundColor,
                    borderBottomWidth:0.5,//might want to remove
                    borderColor:myColors.text,
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                }}>
                    <HomeIcon  />
                </Animated.View>
            </SafeAreaView>
            <ScrollView
                style={{marginTop: 50,paddingTop:0}} // Adjust based on initial header height to avoid overlapping content
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: false} // Use native driver for better performance where possible
                )}
                scrollEventThrottle={10}
            >
                <View style={styles.contentContainer}>
                    <PromotionsCarousel />
                    <AllCategoriesCarousel />
                    <ProductsTitle title='Vegetables' />
                    <IndividualProductCarousel data={ProductServices('Fruits')} />
                    <ProductsTitle title='Meat and fish' />
                    <IndividualProductCarousel data={ProductServices('Meats')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20,
        paddingTop: 90,
        gap: 10,
    },
});

export default Home;
