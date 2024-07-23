import React, { useContext } from "react";
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { ThemeContext } from "../../contexts/ThemeContext";
import useImagesInFolder from "../../Services/useImagesInFolder";

const { width: windowWidth } = Dimensions.get('window');

const PromotionsCarousel = () => {
    const [theme] = useContext(ThemeContext); // Use theme from context
    const myColors = theme.mode; // Access colors based on theme

    const imageUrls = useImagesInFolder('Promotions');

    const data = [
        { id: 1, title: "Promotion 1", description: "Description for Promotion 1", image: imageUrls[0] },
        { id: 2, title: "Promotion 2", description: "Description for Promotion 2", image: imageUrls[1] },
        { id: 3, title: "Promotion 3", description: "Description for Promotion 3", image: imageUrls[2] },
        { id: 4, title: "Promotion 4", description: "Description for Promotion 4", image: imageUrls[3] },
        { id: 5, title: "Promotion 5", description: "Description for Promotion 5", image: imageUrls[4] },
    ];

    const renderItem = (item, index) => (
        <View key={index} style={[styles.itemContainer]}>
            <Image source={{ uri: item.image }} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Swiper
                autoplay
                loop
                autoplayTimeout={3}
                activeDotStyle={styles.paginationDot}
                dotStyle={styles.inactivePaginationDot}
                containerStyle={styles.swiperContainer} // Adjust the container style
                contentContainerStyle={styles.swiperContentContainer}
            >
                {data.map((item, index) => renderItem(item, index))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiperContainer: {
        height: 400,
    },
    swiperContentContainer: {
        flexGrow: 1,
    },
    itemContainer: {
        width: windowWidth - 10,
        height: 350, // Increased height to accommodate the image
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%', // Adjust the height of the image as needed
        borderRadius: 10,
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: '#0097B2',
        marginRight : 10,

    },
    inactivePaginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: '#575454',
        marginRight : 10,
    },
});

export default PromotionsCarousel;
