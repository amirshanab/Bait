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
import { responsiveHeight } from "react-native-responsive-dimensions";
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Cart = () => {
    const nav = useNavigation(); // Access the navigation object
    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.cart); // Get the cart data from the store

    // Calculate total amount
    const totalAmount = storeData.products.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0).toFixed(2);

    return (
        <SafeAreaView style={styles.safe}>

            <Text style={{ textAlign: 'center', fontSize: 23, fontWeight: "500", marginTop: 10 }}>My Cart</Text>

            <FlatList
                data={storeData.products}
                renderItem={({ item, index }) => (
                    <View style={styles.productContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.img }} />
                        </View>
                        <View style={styles.detailsContainer}>
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <AntDesign onPress={() => dispatch(removeFromCart(item))} name="close" size={24} color="black" />
                            </View>
                            <View style={styles.quantityContainer}>
                                <View style={styles.quantityButtons}>
                                    <AntDesign onPress={() => dispatch(decrementQuantity(item))} name="minuscircleo" size={30} color="green" />
                                    <Text style={styles.quantity}>{item.quantity}</Text>
                                    <AntDesign onPress={() => dispatch(incrementQuantity(item))} name="pluscircleo" size={30} color="green" />
                                </View>
                                <Text style={styles.price}>₪ {(item.quantity * item.price).toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={styles.footer}>
                <Text style={styles.totalAmount}>Total Amount: ₪ {totalAmount}</Text>
                <TouchableOpacity
                    onPress={() => {
                        nav.navigate("Home");
                    }}
                    style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe:{
        flex: 1, paddingHorizontal: 10,
        backgroundColor: myColors.primary,
        paddingTop:Platform.OS === 'android' ? StatusBar.currentHeight -10 : 0
    },

    productContainer: {
        height: responsiveHeight(15),
        borderBottomColor: "black",
        borderBottomWidth: 2,
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 0.35,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        height: 120,
        width: 120,
        resizeMode: 'contain'
    },
    detailsContainer: {
        flex: 0.65,
        paddingHorizontal: 10,
        paddingVertical: 30,
        justifyContent: 'center'
    },

    productDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    productName: {
        fontSize: 20,
        fontWeight: "500"
    },

    quantityContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        gap: 15
    },
    quantity: {
        fontSize: 20,
        fontWeight: "500",
        marginVertical: 2,
        opacity: 0.6
    },
    price: {
        fontSize: 22,
        fontWeight: "500",
        marginHorizontal: 15
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 10,
        right: 10,
        alignItems: 'center'
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20
    },
    checkoutButton: {
        backgroundColor: myColors.clickable,
        paddingVertical: 20,
        paddingHorizontal: 100,
        borderRadius: 20,
        alignItems: 'center'
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 24
    }
});

export default Cart;
