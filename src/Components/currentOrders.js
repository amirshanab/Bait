import React, { useContext, useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    Dimensions,
    LayoutAnimation,
    UIManager,
    Platform
} from "react-native"; // Import LayoutAnimation and UIManager
import GetOrders from "../../Services/GetOrders";
import { ThemeContext } from "../../contexts/ThemeContext";
import { myColors, myColors as color } from "../Utils/MyColors"; // Assuming this path is correct
import { Ionicons } from "@expo/vector-icons";

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CurrentOrderScreen = ({ status }) => {
    const [theme] = useContext(ThemeContext);
    const myColors = color[theme.mode];
    const [Orders, setOrders] = useState([]);
    const [expandedStates, setExpandedStates] = useState([]); // State to track if items are expanded for each order

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await GetOrders(status);
                // Initialize expandedStates array with false for each order
                const initialExpandedStates = fetchedOrders.map(() => false);
                setExpandedStates(initialExpandedStates);
                setOrders(fetchedOrders);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, [status]);

    const toggleExpand = (index) => {
        // Animate the layout change
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const newExpandedStates = [...expandedStates];
        newExpandedStates[index] = !newExpandedStates[index];
        setExpandedStates(newExpandedStates);
    };

    const renderOrderItem = ({ item, index }) => {
        // Handle Scheduled Delivery
        let ScheduledDelivery = item.ScheduledDelivery ? item.ScheduledDelivery.substring(0, 10) : "Immediate";
        // Handle Order Date
        let orderDate = "";
        if (item.orderDate) {
            if (typeof item.orderDate === "object") {
                orderDate = new Date(item.orderDate.seconds * 1000).toLocaleDateString(); // Convert Firestore timestamp to Date object and format
            } else {
                orderDate = item.orderDate; // Assume it's already formatted as a string
            }
        }
        if (ScheduledDelivery == null) {
            ScheduledDelivery = "immediate";
        }
        console.log("Scheduled Delivery is " + ScheduledDelivery)
        return (
            <TouchableOpacity activeOpacity={.8} style={styles.orderItem} onPress={() => toggleExpand(index)}>
                <Text style={styles.orderTitle}>Order ID: {item.id}</Text>
                <View style={styles.dropdown}>
                    <View>
                        <Text style={styles.inlineTexts}>Scheduled Delivery: {ScheduledDelivery}</Text>
                        <Text style={styles.inlineTexts}>Order Date: {orderDate}</Text>
                        <Text style={styles.inlineTexts}>Total Amount: ₪{parseFloat(item.totalAmount).toFixed(2)}</Text>
                    </View>
                    {expandedStates[index] && (
                        <FlatList
                            data={item.items}
                            renderItem={({ item: product }) => (
                                <View style={[styles.productItem, { width: itemWidth }]}>
                                    <Image style={styles.productImage} source={{ uri: product.Image }} />
                                    <View style={styles.productDetails}>
                                        <Text>{product.Name}</Text>
                                        <Text>Price: ₪{parseFloat(product.Price).toFixed(2)}</Text>
                                        <Text>Quantity: {product.quantity}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(product, idx) => `${product.Name}_${idx}`} // Ensure each product has a unique key
                            numColumns={numColumns}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    )}
                </View>
                <TouchableOpacity style={styles.dropdownButton}>
                    <Ionicons name={expandedStates[index] ? "chevron-up-outline" : "chevron-down-outline"} size={24} color="black" />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    // Calculate number of columns based on screen width
    const numColumns = 2;
    const itemWidth = Dimensions.get('window').width / numColumns;

    return (
        <View style={[styles.container, { backgroundColor: myColors.primary }]}>
            <FlatList
                data={Orders}
                renderItem={({ item, index }) => renderOrderItem({ item, index })}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    orderItem: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    dropdown: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 10,
    },
    dropdownButton: {
        position: "absolute",
        top: 15,
        right: 15,
    },
    productItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
    },
    flatListContent: {
        flexGrow: 1,
    },
    inlineTexts: {
        fontSize: 15,
        marginBottom: 5,
    },
});

export default CurrentOrderScreen;
