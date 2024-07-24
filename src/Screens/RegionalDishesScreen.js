import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Platform, Image } from 'react-native';
import regionsServices from '../../Services/regionsServices';
import { myColors as color } from "../Utils/MyColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SharedElement } from 'react-navigation-shared-element';
import Logo from "../Components/Logo";

export default function RegionalDishesScreen({ navigation }) {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    const styles = getStyles(myColors)
    const [Regions, setRegions] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            try {
                const regionsData = await regionsServices();
                setRegions(regionsData);
            } catch (err) {
                console.error(err);
            }
        };
        fetch();
    }, []);

    return (
        <SafeAreaView style={styles.safe }>
            <Logo />
            <View style={styles.ing}>
                <Text style={styles.header }>Select a Region</Text>
            </View>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={Regions}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item }
                        onPress={() => navigation.navigate('Dishes', { regionId: item.id, name: item.name,image: item.image })}
                    >
                        <SharedElement id={item.id}>
                            <Image style={styles.regionImage} source={{ uri: item.image }} />
                        </SharedElement>
                        <Text style={styles.title }>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const getStyles = (myColors) => StyleSheet.create({
    safe: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: myColors.primary
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: myColors.text
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: myColors.text
    },
    title: {
        paddingLeft: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: myColors.text
    },
    regionImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
