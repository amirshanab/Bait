import React from "react";
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    FlatList,
    View,
    Image,
    StyleSheet,
    Platform,
    StatusBar, Dimensions
} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {removeFromCart, decrementQuantity, incrementQuantity} from "../../Redux/CartSlice";
import {myColors as color} from "../Utils/MyColors";
import {AntDesign} from '@expo/vector-icons';
import {ThemeContext} from "../../contexts/ThemeContext";
import AwesomeButton from "react-native-really-awesome-button";

const Cart = () => {
    const [theme] = React.useContext(ThemeContext);
    let myColors = color[theme.mode];
    const {width: windowWidth} = Dimensions.get('window');

    const nav = useNavigation(); // Access the navigation object
    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.cart); // Get the cart data from the store
    // Calculate total amount
    const totalAmount = storeData.products.reduce((acc, curr) => acc + (curr.quantity * curr.Price), 0).toFixed(2);

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: myColors.primary,}]}>
            <Text style={[styles.title, {color: myColors.text}]}>My Cart</Text>
            <FlatList
                data={storeData.products}
                bounces={true} // Enable elastic scrolling
                renderItem={({item}) => (
                    <View style={[styles.productContainer, {borderBlockColor: myColors.text,}]}>
                        <Image style={styles.image} source={{uri: item.Image}}/>
                        <View style={styles.productInfo}>
                            <Text style={[styles.productName, {color: myColors.text}]}>{item.Name}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => dispatch(decrementQuantity(item))}>
                                    <AntDesign name="minus" size={24} color={myColors.text}/>
                                </TouchableOpacity>
                                <Text
                                    style={[styles.quantity, {color: myColors.text}]}>{item.quantity} {item.Scale ? 'Kg' : ''}</Text>
                                <TouchableOpacity onPress={() => dispatch(incrementQuantity(item))}>
                                    <AntDesign name="plus" size={24} color={myColors.text}/>
                                </TouchableOpacity>
                                <Text
                                    style={[styles.price, {color: myColors.text}]}>₪ {(item.quantity * item.Price).toFixed(2)}</Text>
                                <TouchableOpacity onPress={() => dispatch(removeFromCart(item))}>
                                    <AntDesign name="delete" size={24} color={myColors.text}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={[styles.footer, {backgroundColor: myColors.background}]}>
                <Text style={[styles.totalAmount, {color: myColors.text}]}>Total Amount: ₪ {totalAmount}</Text>
                <AwesomeButton
                    backgroundDarker={myColors.clickable}
                    borderRadius={14}
                    springRelease={false}
                    textSize={18}
                    width={windowWidth - 40}
                    backgroundColor={myColors.clickable}
                    onPress={() => nav.navigate("Checkout", { totalAmount, items: storeData.products })}
                >
                    Go to Checkout
                </AwesomeButton>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        paddingBottom: 15,
    },
    productContainer: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    image: {
        resizeMode: 'contain',
        margin: 10,
        width: 80,
        height: 80,
        borderRadius: 10
    },
    productInfo: {
        flex: 1,
        marginLeft: 10
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },
    checkoutButton: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default Cart;
