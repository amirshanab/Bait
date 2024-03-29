import React, { useContext } from "react";
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {myColors, myColors as color} from "../Utils/MyColors";
import { ThemeContext } from "../../contexts/ThemeContext";

const { width: windowWidth } = Dimensions.get('window');

const data = [
    { id: 1, title: "Promotion 1", description: "Description for Promotion 1" },
    { id: 2, title: "Promotion 2", description: "Description for Promotion 2" },
    { id: 3, title: "Promotion 3", description: "Description for Promotion 3" },
    { id: 4, title: "Promotion 4", description: "Description for Promotion 4" },
    { id: 5, title: "Promotion 5", description: "Description for Promotion 5" },
];

const renderItem = ({ item, myColors }) => (
    <View style={[styles.itemContainer, {backgroundColor: myColors.white}]}>
        <Text style={[styles.title,{color:myColors.text}]}>{item.title}</Text>
        <Text style={[styles.description,{color:myColors.text}]}>{item.description}</Text>
    </View>
);

const PromotionsCarousel = () => {
    const [theme] = useContext(ThemeContext); // Use theme from context
    let myColors = color[theme.mode]; // Access colors based on theme

    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <View style={styles.container}>
            <Carousel
                data={data}
                renderItem={({item}) => renderItem({item, myColors})}
                sliderWidth={windowWidth}
                itemWidth={windowWidth}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        width: windowWidth - 30,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        // backgroundColor set dynamically now
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
    },
    paginationContainer: {
        paddingVertical: 10,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: '#0097B2',
    },
});

export default PromotionsCarousel;
