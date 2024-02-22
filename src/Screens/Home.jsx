import React from "react";
import {View, Image, Text, StyleSheet, SafeAreaView, StatusBar} from "react-native";
import Carousel from "react-native-snap-carousel";
import {myColors} from "../Utils/MyColors";
import HomeIcon from "../Components/HomeIcon";
import HomeSearch from "../Components/HomeSearch";
import ProductsTitle from "../Components/ProductsTitle";
import PromotionsCarousel from "../Components/PromotionsCarousel";
import AllProductsCarousel from "../Components/AllProductsCarousel";
import IndividualProductCarousel from "../Components/IndividualProductCarousel";


const Home = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: myColors.primary}}>
            <View style={{paddingHorizontal: 15, gap: 10}}>

                <HomeIcon/>
                <HomeSearch/>
                <PromotionsCarousel/>
                <AllProductsCarousel/>
                <ProductsTitle title='Vegatables'/>
                <IndividualProductCarousel/>



            </View>
        </SafeAreaView>
    );
};


export default Home;
