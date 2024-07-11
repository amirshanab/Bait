import React, { useContext } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { myColors as color } from '../Utils/MyColors';

const Dishes = () => {
    const [theme] = useContext(ThemeContext);
    const myColors = color[theme.mode];

    const styles = createStyles(myColors);

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text>hi</Text>
        </SafeAreaView>
    );
};

const createStyles = (myColors) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: myColors.primary,

    }
});

export default Dishes;
