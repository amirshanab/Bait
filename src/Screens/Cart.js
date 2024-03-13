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
    StatusBar
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { removeFromCart, decrementQuantity, incrementQuantity } from "../../Redux/CartSlice";
import { myColors } from "../Utils/MyColors";
import { AntDesign } from '@expo/vector-icons';

const Cart = () => {
    const nav = useNavigation(); // Access the navigation object
    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.cart); // Get the cart data from the store

    // Calculate total amount
    const totalAmount = storeData.products.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0).toFixed(2);

    return (
        <SafeAreaView style={styles.safe}>
            <Text style={styles.title}>My Cart</Text>
            <FlatList
                data={storeData.products}
                bounces={true} // Enable elastic scrolling
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image style={styles.image} source={{ uri: item.img }} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => dispatch(decrementQuantity(item))}>
                                    <AntDesign name="minus" size={24} color={myColors.text} />
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => dispatch(incrementQuantity(item))}>
                                    <AntDesign name="plus" size={24} color={myColors.text} />
                                </TouchableOpacity>
                                <Text style={styles.price}>₪ {(item.quantity * item.price).toFixed(2)}</Text>
                                <TouchableOpacity onPress={() => dispatch(removeFromCart(item))}>
                                    <AntDesign name="delete" size={24} color={myColors.text} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.footer}>
                <Text style={styles.totalAmount}>Total Amount: ₪ {totalAmount}</Text>
                <TouchableOpacity onPress={() => nav.navigate("Home")} style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: myColors.primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        paddingBottom: 15,
        color: myColors.text
    },
    productContainer: {
        borderBlockColor:'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    image: {
        resizeMode : 'contain',
        width: 90,
        height: 90,
        borderRadius: 10
    },
    productInfo: {
        flex: 1,
        marginLeft: 10
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: myColors.text
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
        color: myColors.text
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: myColors.text
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: myColors.background
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: myColors.text
    },
    checkoutButton: {
        backgroundColor: myColors.clickable,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default Cart;
