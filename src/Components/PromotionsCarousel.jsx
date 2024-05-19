import React, { useContext } from "react";
import { View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { myColors, myColors as color } from "../Utils/MyColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import useImagesInFolder from "../../Services/useImagesInFolder";

const { width: windowWidth } = Dimensions.get('window');

const PromotionsCarousel = () => {
    const [theme] = useContext(ThemeContext); // Use theme from context
    let myColors = color[theme.mode]; // Access colors based on theme

    const imageUrls = useImagesInFolder('Promotions');

    const data = [
        { id: 1, title: "Promotion 1", description: "Description for Promotion 1", image:imageUrls[0] },
        { id: 2, title: "Promotion 2", description: "Description for Promotion 2", image: imageUrls[1] },
        { id: 3, title: "Promotion 3", description: "Description for Promotion 3",  image: imageUrls[2]  },
        { id: 4, title: "Promotion 4", description: "Description for Promotion 4", image:imageUrls[3]  },
        { id: 5, title: "Promotion 5", description: "Description for Promotion 5", image: imageUrls[4] },
    ];
    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer]}>
            <Image source={{ uri: item.image }} style={styles.image} />
        </View>
    );

    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <View style={styles.container}>
            <Carousel
                data={data}
                autoplay={true}
                loop={true}
                renderItem={renderItem}
                sliderWidth={windowWidth}
                autoplayInterval={3000}
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
