import React from "react";
import {ScrollView, View, SafeAreaView} from "react-native";
import {myColors} from "../Utils/MyColors";
import HomeIcon from "../Components/HomeIcon";
import HomeSearch from "../Components/HomeSearch";
import ProductsTitle from "../Components/ProductsTitle";
import PromotionsCarousel from "../Components/PromotionsCarousel";
import AllProductsCarousel from "../Components/AllProductsCarousel";
import IndividualProductCarousel from "../Components/IndividualProductCarousel";
import {fruits} from "../Utils/Data";


const Home = () => {

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: myColors.primary}}>
            <ScrollView>
                <View style={{paddingHorizontal: 15, paddingBottom: 20, paddingTop: 10, gap: 10}}>

                    <HomeIcon/>
                    <HomeSearch/>
                    <PromotionsCarousel/>
                    <AllProductsCarousel/>
                    <ProductsTitle title='Vegatables'/>
                    <IndividualProductCarousel data={fruits}/>
                    <ProductsTitle title='Meat and fish'/>
                    <IndividualProductCarousel data={fruits}/>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
