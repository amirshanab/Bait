import React, { useState, useContext, useRef, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Platform,
    Alert, useColorScheme,

} from 'react-native';
import { TextInput, useTheme} from 'react-native-paper';
import {PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps'
import BottomSheet from '@gorhom/bottom-sheet';
import Toast from "react-native-toast-message";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { myColors as color} from '../Utils/MyColors';
import { ThemeContext } from '../../contexts/ThemeContext';
import Logo from '../Components/Logo';
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import AwesomeButton from "react-native-really-awesome-button";
import MapStyle from "../Utils/MapStyle.json"
export default function CheckoutScreen() {
    const mapStyle = MapStyle
    const [inputValues, setInputValues] = useState({
        cityName: '',
        streetName: '',
        buildingNumber: '',
        notesToDriver: '',
    });

    const inputRefs = {
        streetName: useRef(null),
        buildingNumber: useRef(null),
        notesToDriver: useRef(null),
    };
    const [theme] = useContext(ThemeContext);
    const { } = useTheme();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [sheetIndex, setSheetIndex] = useState(-1);
    const snapPoints = ['80%'];
    const sheetRef = useRef(null); // Add this line
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const route = useRoute();
    const { totalAmount, items } = route.params;

    const myColors = color[theme.mode]; // updated to use const
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('today');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash');
    const [location, setLocation] = useState(null);
        const [loadingLocation, setLoadingLocation] = useState(false);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
            }

        })();
    }, []);
    const handleInputChange = (name, value) => {
        setInputValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const focusNextInput = (key) => {
        inputRefs[key].current.focus();
    };
    const getLocation = async () => {
        setLoadingLocation(true);
        try {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        } catch (error) {
            console.log(error);
            Alert.alert('Error getting location', 'Please try again.');
        } finally {
            setLoadingLocation(false);
            Toast.show({
                type:'success',
                text1 : 'Location was successfully shared 📍',
                onPress: () => {        setSheetIndex(sheetIndex === 0 ? 1 : 0)
                }
            })
        }
    };

    const handleDeliveryOptionSelect = (option) => {
        setSelectedDeliveryOption(option);
        setSelectedDate(null);
        if (option === 'schedule') {
            setShowDatePicker(true);
            setSelectedDate(new Date());
            if (Platform.OS === 'ios') {
                setTimeout(() => {
                    scrollViewRef.current.scrollToEnd({ animated: true });
                },);
            }
        } else {
            setShowDatePicker(false);
        }
    };

    const handlePayment = (option) => {
        setSelectedPaymentMethod(option);
    };
    const shareLoc = () => {
        setSheetIndex(sheetIndex === 0 ? 1 : 0)
        getLocation()

    }

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate);
    };

    const getGoogleMapsUrl = (coords) => {
        return `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`;
    };

    function renderContent() {
        return (
            <ScrollView>
                <View style={{ backgroundColor: myColors.primary, padding: 10 }}>
                    {location && (
                        <View>
                            <Text style={[styles.locationText, { color: myColors.text }]}>
                                Your Location:
                            </Text>
                            <MapView
                                customMapStyle={isDarkMode ? mapStyle : null}
                                style={styles.map}
                                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                                initialRegion={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                    }}
                                    title="Your Location"
                                    description="This is your current location"
                                />
                            </MapView>
                            <View>
                                <Text style={[styles.label, { color: myColors.text }]}>City Name</Text>
                                <TextInput
                                    style={[styles.input, { color: myColors.text }]}
                                    mode="outlined"
                                    placeholderTextColor={myColors.placeholder}
                                    onChangeText={(text) => handleInputChange('cityName', text)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => focusNextInput('streetName')}
                                />
                            </View>
                            <View style={styles.horiz}>
                                <View style={styles.inputContainer}>
                                    <Text style={[styles.label, { color: myColors.text }]}>Street Name</Text>
                                    <TextInput
                                        ref={inputRefs.streetName}
                                        style={[styles.input, { color: myColors.text }]}
                                        mode="outlined"
                                        placeholderTextColor={myColors.placeholder}
                                        onChangeText={(text) => handleInputChange('streetName', text)}
                                        returnKeyType="next"
                                        onSubmitEditing={() => focusNextInput('buildingNumber')}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={[styles.label, { color: myColors.text }]}>Building Number</Text>
                                    <TextInput
                                        ref={inputRefs.buildingNumber}
                                        style={[styles.input, { color: myColors.text }]}
                                        mode="outlined"
                                        keyboardType="numeric"
                                        placeholderTextColor={myColors.placeholder}
                                        onChangeText={(text) => handleInputChange('buildingNumber', text)}
                                        returnKeyType="next"
                                        onSubmitEditing={() => focusNextInput('notesToDriver')}
                                    />
                                </View>
                            </View>

                            <Text style={[styles.label, { color: myColors.text }]}>Notes to driver</Text>
                            <TextInput
                                ref={inputRefs.notesToDriver}
                                style={[styles.input, { color: myColors.text, marginBottom: 40, height: 100 }]}
                                mode="outlined"
                                multiline
                                numberOfLines={3}
                                placeholderTextColor={myColors.placeholder}
                                onChangeText={(text) => handleInputChange('notesToDriver', text)}
                            />
                            <AwesomeButton
                                backgroundColor='red'
                                backgroundDarker={myColors.primary}
                                borderRadius={14}
                                stretch={true}
                                textSize={18}
                                onPress={() => {
                                    setSheetIndex(-1);
                                    sheetRef.current?.close();
                                }}
                            >
                                Close
                            </AwesomeButton>
                        </View>

                    )}
                </View>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: myColors.primary }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container} ref={scrollViewRef}>
                <Logo />
                <Text style={[styles.header, { color: myColors.text }]}>Checkout</Text>
                {/* Shipping Information */}

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: myColors.clickable }]}
                    onPress={shareLoc} // Toggle bottom sheet
                >
                    <Text style={[styles.buttonText, { color: myColors.text }]}>
                        {loadingLocation ? 'Getting Address...' : 'Share Address'}
                    </Text>
                </TouchableOpacity>

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
                            Alert.alert('Please choose both delivery option and payment method.');
                            return;
                        }
                        // Proceed with order confirmation
                        const locationUrl = location ? getGoogleMapsUrl(location) : null;
                        navigation.navigate('OrderConfirmation', {
                            totalAmount,
                            items,
                            selectedDate: selectedDate ? selectedDate.toISOString() : null,
                            selectedPaymentMethod,
                            locationUrl,
                        });
                    }}
                >
                    <Text style={[styles.buttonText, { color: myColors.text }]}>Confirm Order</Text>
                </TouchableOpacity>
            </ScrollView>
            <BottomSheet ref={sheetRef}
                         index={sheetIndex}
                         snapPoints={snapPoints}
                         enablePanDownToClose={true}
                         onChange={(index) => setSheetIndex(index)}>
                {renderContent()}

            </BottomSheet>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    BottomSheet: {
        flex: 1,
        padding : 10,
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
        flexDirection: 'column',
    },
    highlightButtonText: {
        marginTop: 10,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
    locationText: {
        marginTop: 10,
        marginBottom: 20,
        fontSize: 20,
    },
    selectedDateText: {
        marginTop: 10,
        fontSize: 16,
    },
    map: {
        width: '100%',
        height: 200,
        marginTop: 10,
        marginBottom: 30,
        padding:150,

    },
    label: {
        marginBottom : 10
    },
    horiz: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 5,
    },

});


