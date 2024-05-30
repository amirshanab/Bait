import React, { useState, useContext, useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, View, Platform } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { myColors as color } from '../Utils/MyColors';
import { ThemeContext } from '../../contexts/ThemeContext';
import Logo from '../Components/Logo';
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CheckoutScreen() {
    const [theme] = useContext(ThemeContext);
    const { } = useTheme();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const route = useRoute();
    const { totalAmount, items } = route.params;
    const myColors = color[theme.mode]; // updated to use const
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('today');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash');

    const handleDeliveryOptionSelect = (option) => {
        setSelectedDeliveryOption(option);
        setSelectedDate(null);
        if (option === 'schedule') {
            setShowDatePicker(true);
            setSelectedDate(new Date());
            if(Platform.OS === 'ios') {
                setTimeout(() => {
                    scrollViewRef.current.scrollToEnd({animated: true});
                },);
            }
        } else {
            setShowDatePicker(false);
        }
    };

    const handlePayment = (option) => {
        setSelectedPaymentMethod(option);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate);
    };



    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: myColors.primary }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container} ref={scrollViewRef}>
                <Logo />
                <Text style={[styles.header, { color: myColors.text }]}>Checkout</Text>
                {/* Shipping Information */}
                <TextInput
                    mode="outlined"
                    label="Name"
                    returnKeyType={"next"}
                    style={styles.input}
                    onSubmitEditing={() =>{
                        addressRef.current.focus()
                    }}
                    theme={{ colors: { text: myColors.text, placeholder: myColors.placeholder, background: myColors.white } }}
                />
                <TextInput
                    mode="outlined"
                    label="Address"
                    returnKeyType={"next"}
                    ref={addressRef}
                    style={styles.input}
                    onSubmitEditing={() =>{
                        cityRef.current.focus()
                    }}
                    theme={{ colors: { text: myColors.text, placeholder: myColors.placeholder, background: myColors.white } }}
                />
                <TextInput
                    mode="outlined"
                    label="City"
                    returnKeyType={"done"}
                    ref={cityRef}
                    style={styles.input}
                    theme={{ colors: { text: myColors.text, placeholder: myColors.placeholder, background: myColors.white } }}
                />
                {/* Delivery Options */}
                <Text style={[styles.subheader, { color: myColors.text }]}>Delivery Options</Text>
                <View style={styles.deliveryContainer}>
                    <TouchableOpacity
                        style={[
                            styles.highlightButton,
                            { backgroundColor: selectedDeliveryOption === 'today' ? myColors.highlight : myColors.clickable }
                        ]}
                        onPress={() => handleDeliveryOptionSelect('today')}
                    >
                        <Icon name="truck" size={24} color={myColors.text} />
                        <Text style={[styles.highlightButtonText, { color: myColors.text }]}>Deliver Today</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.highlightButton,
                            { backgroundColor: selectedDeliveryOption === 'schedule' ? myColors.highlight : myColors.clickable }
                        ]}
                        onPress={() => handleDeliveryOptionSelect('schedule')}
                    >
                        <Icon name="calendar" size={24} color={myColors.text} />
                        <Text style={[styles.highlightButtonText, { color: myColors.text }]}>Schedule</Text>
                    </TouchableOpacity>
                </View>
                {/* Date Picker */}
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={selectedDate || new Date()} // Use selectedDate or today's date
                        mode="date"
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        minimumDate={new Date()} // Set minimum date to today
                        onChange={handleDateChange}
                    />
                )}
                {/* Render selectedDate if exists */}
                {selectedDate && (
                    <Text style={[styles.selectedDateText, { color: myColors.text }]}>
                        Selected Date: {selectedDate.toLocaleDateString()}
                    </Text>
                )}
                {/* Payment Methods */}
                <Text style={[styles.subheader, { color: myColors.text }]}>Payment Method</Text>
                <View style={styles.deliveryContainer}>
                    <TouchableOpacity
                        style={[
                            styles.highlightButton,
                            { backgroundColor: selectedPaymentMethod === 'Cash' ? myColors.highlight : myColors.clickable }
                        ]}
                        onPress={() => handlePayment('Cash')}
                    >
                        <Icon name="cash" size={30} color={myColors.text} />
                        <Text style={[styles.highlightButtonText, { color: myColors.text }]}>Cash</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.highlightButton,
                            { backgroundColor: selectedPaymentMethod === 'Card' ? myColors.highlight : myColors.clickable }
                        ]}
                        onPress={() => handlePayment('Card')}
                    >
                        <Icon name="credit-card" size={30} color={myColors.text} />
                        <Text style={[styles.highlightButtonText, { color: myColors.text }]}>Card</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: myColors.clickable }]}
                    onPress={() => {
                        if (!selectedDeliveryOption || !selectedPaymentMethod) {
                            // Alert the user to choose both delivery option and payment method
                            alert('Please choose both delivery option and payment method.');
                            return;
                        }
                        // Proceed with order confirmation
                        navigation.navigate('OrderConfirmation');
                    }}
                >
                    <Text style={[styles.buttonText, { color: myColors.text }]}>Confirm Order</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    subheader: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    deliveryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    highlightButton: {
        flex: 1,
        height: 100,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
    },
    highlightButtonText: {
        fontSize: 16,
        marginLeft: 10,
    },
    button: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    selectedDateText: {
        fontSize: 16,
        marginTop: 10,
    },
});
