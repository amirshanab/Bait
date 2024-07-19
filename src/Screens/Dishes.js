import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { myColors as color } from '../Utils/MyColors';
import { useRoute } from '@react-navigation/native';
import DishesServices from '../../Services/DishesServices';
import Logo from "../Components/Logo";

const Dishes = ({ navigation }) => {
    const [theme] = useContext(ThemeContext);
    const myColors = color[theme.mode];
    const styles = createStyles(myColors);
    const route = useRoute();
    const { regionId,name } = route.params;

    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        const fetchDishes = async () => {
            const fetchedDishes = await DishesServices(regionId);
            setDishes(fetchedDishes);
        };

        fetchDishes();
    }, [regionId]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.dishItem} onPress={() => navigation.navigate('DishDetails', { dishId: item.id })}>
            <Image source={{ uri: item.image }} style={styles.dishImage} />
            <View style={styles.dishTextContainer}>
                <Text style={styles.dishName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Logo></Logo>
            <Text style={styles.headerText}>Dishes in {name} Region</Text>
            <FlatList
                data={dishes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No dishes found.</Text>}
            />
        </SafeAreaView>
    );
};

const createStyles = (myColors) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: myColors.primary,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: myColors.text,
        marginTop : 50,
        margin: 10,
    },
    listContainer: {
        padding: 10,
    },
    dishItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: myColors.secondary,
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
    },
    dishImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    dishTextContainer: {
        flex: 1,
    },
    dishName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: myColors.text,
    },
    dishDescription: {
        fontSize: 14,
        color: myColors.text,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: myColors.text,
    },
});

export default Dishes;
