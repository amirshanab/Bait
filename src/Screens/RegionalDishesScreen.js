import React, {useEffect, useState, useContext} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
    Image
} from 'react-native';
import regionsServices from '../../Services/regionsServices';
import {myColors as color} from "../Utils/MyColors";
import {ThemeContext} from "../../contexts/ThemeContext";
import Logo from "../Components/Logo";

export default function RegionalDishesScreen({navigation}) {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];

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
        <SafeAreaView style={[styles.safe, {backgroundColor: myColors.primary}]}>
            <Logo/>
            <View style={styles.ing}>
                <Text style={[styles.header, {color: myColors.text}]}>Select a Region</Text>
            </View>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={Regions}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={[styles.item, {borderColor: myColors.text}]}
                        onPress={() => navigation.navigate('Dishes', {regionId: item.id})}
                    >
                        <Image style={styles.regionImage} source={{uri: item.img}}/>
                        <Text style={[styles.title, {color: myColors.text}]}>{item.name}</Text>
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
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
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
    },
    title: {
        paddingLeft: 40,
        fontSize: 24,
        fontWeight: 'bold',
    },
    regionImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
