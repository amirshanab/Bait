import React, { useEffect, useState } from 'react';
import {  Text, StyleSheet, Animated } from 'react-native';

const AddToCartAnimation = ({ itemName }) => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
                delay: 1000, // Delay before fading out
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim, // Bind opacity to animated value
                },
            ]}>
            <Text style={styles.text}>{`${itemName} added to cart`}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default AddToCartAnimation;
