import React from 'react';
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
import {regions} from "../Utils/Data";
import {myColors as color} from "../Utils/MyColors";
import {ThemeContext} from "../../contexts/ThemeContext";
import Logo from "../Components/Logo";


export default function RegionalDishesScreen({navigation}) {
    const [theme] = React.useContext(ThemeContext);
    let myColors = color[theme.mode];
    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: myColors.primary,}]}>
            <Logo/>
            <View style={styles.ing}>
                <Text style={[styles.header, {color: myColors.text,}]}>Select a Region</Text>
            </View>
            <FlatList

                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={[styles.item, {borderColor: myColors.text,}]}
                        onPress={() => {
                            navigation.navigate('Dishes', {region: item.name});
                        }}>
                        <Image style={styles.regionImage} source={{uri: item.img}}/>
                        <Text style={[styles.title, {color: myColors.text,}]}>{item.name}</Text>
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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logo: {
        width: 150,
        height: 150, // Adjust based on your Logo's aspect ratio
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
        height: 100, // Adjust based on the aspect ratio of your images
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
