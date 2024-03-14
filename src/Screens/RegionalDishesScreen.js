import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Platform, Image } from 'react-native';
import { regions } from "../Utils/Data";
import { myColors } from "../Utils/MyColors";

export default function RegionalDishesScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                <View style={styles.ing}>
                <Text style={styles.header}>Select a Region</Text>
                </View>
            </View>
            <FlatList
                data={regions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            navigation.navigate('Dishes', { region: item.name });
                        }}>
                        <Image style={styles.regionImage} source={{ uri: item.img }} />
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

// Include styles for regionImage similar to dishImage in DishesScreen
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: myColors.text,
        marginVertical: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: myColors.secondary,
    },
    title: {
        paddingLeft: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: myColors.text,
    },
    regionImage: {
        width: 100,
        height: 100, // Adjust based on the aspect ratio of your images
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
