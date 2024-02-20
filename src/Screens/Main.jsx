import React, { useRef, useState } from "react";
import { ScrollView, StatusBar, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../Utils/MyColors";

const Main = () => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Dummy data for carousel
    const carouselData = [
        { title: 'Item 1', text: 'Text 1' },
        { title: 'Item 2', text: 'Text 2' },
        { title: 'Item 3', text: 'Text 3' },
        // Add more items as needed
    ];

    // Scroll to the next item in the carousel
    const scrollToNextItem = () => {
        if (currentIndex < carouselData.length - 1) {
            setCurrentIndex(currentIndex + 1);
            scrollViewRef.current.scrollTo({ x: currentIndex * 300, animated: true });
        }
    };

    // Scroll to the previous item in the carousel
    const scrollToPrevItem = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            scrollViewRef.current.scrollTo({ x: currentIndex * 300, animated: true });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
            <StatusBar style={'light'} />
            <View style={styles.carouselContainer}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                        const contentOffsetX = event.nativeEvent.contentOffset.x;
                        const newIndex = Math.round(contentOffsetX / 300);
                        setCurrentIndex(newIndex);
                    }}
                    scrollEventThrottle={16}
                >
                    {carouselData.map((item, index) => (
                        <View key={index} style={styles.carouselItem}>
                            <Text style={styles.carouselTitle}>{item.title}</Text>
                            <Text style={styles.carouselText}>{item.text}</Text>
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity onPress={scrollToPrevItem} style={styles.arrowButton}>
                    <Text style={styles.arrowButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={scrollToNextItem} style={[styles.arrowButton, styles.arrowButtonRight]}>
                    <Text style={styles.arrowButtonText}>{'>'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    carouselItem: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    carouselTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    carouselText: {
        fontSize: 16,
        marginTop: 10,
    },
    arrowButton: {
        position: 'absolute',
        top: '50%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        zIndex: 2,
    },
    arrowButtonRight: {
        right: 0,
    },
    arrowButtonText: {
        color: 'white',
        fontSize: 24,
    },
});

export default Main;
