import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Platform, StatusBar } from 'react-native';
import { dishes } from "../Utils/Data";
import { myColors as color } from "../Utils/MyColors";
import {ThemeContext} from "../../contexts/ThemeContext";

export default function DishesScreen({ navigation, route }) {
    const [theme] = React.useContext(ThemeContext);
    let myColors = color[theme.mode];
    const { region } = route.params;
    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: myColors.primary,}]}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>
            <FlatList
                data={dishes.filter(dish => dish.region === region)}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.item, {borderColor : myColors.text}]}
                        onPress={() => navigation.navigate('Ingredients', { dishId: item.id, dishName: item.name })}>
                        <Image style={styles.dishImage} source={{ uri: item.img }} />
                        <Text style={[styles.title, {color: myColors.text,}]}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logo: {
        width: 70,
        height: 70, // Adjust based on your logo's aspect ratio
        resizeMode: 'contain',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 10,
    },
    title: {
        paddingLeft: 20,
        fontSize: 22,
        fontWeight: 'bold',

    },
    dishImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
