import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: windowWidth } = Dimensions.get('window');

const data = [
    { id: 1, title: "Promotion 1", description: "Description for Promotion 1" },
    { id: 2, title: "Promotion 2", description: "Description for Promotion 2" },
    { id: 3, title: "Promotion 3", description: "Description for Promotion 3" },
    { id: 4, title: "Promotion 4", description: "Description for Promotion 4" },
    { id: 5, title: "Promotion 5", description: "Description for Promotion 5" },
];

const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
    </View>
);

const PromotionsCarousel = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <View style={styles.container}>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={windowWidth}
                itemWidth={windowWidth }
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
        backgroundColor: '#f0f0f0',
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
