import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Platform, StatusBar } from 'react-native';
import { dishes } from "../Utils/Data";
import { myColors } from "../Utils/MyColors";

export default function DishesScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>
            <FlatList
                data={dishes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('Ingredients', { dishId: item.id, dishName: item.name })}>
                        <Image style={styles.dishImage} source={{ uri: item.img }} />
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: myColors.primary,
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
        // backgroundColor: myColors.tertiary,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 10,
    },
    title: {
        paddingLeft: 20,
        fontSize: 22,
        fontWeight: 'bold',
        color: myColors.text,
    },
    dishImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
