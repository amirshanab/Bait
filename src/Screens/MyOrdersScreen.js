import React, {useContext} from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { myColors as color } from "../Utils/MyColors";
import {ThemeContext} from "../../contexts/ThemeContext";
import CurrentOrderScreen from "../Components/currentOrders"
import Logo from "../Components/Logo";
const Tab = createMaterialTopTabNavigator();





function MyOrdersScreen() {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    const styles = getStyles(myColors)
    const CurrentOrders = () => <CurrentOrderScreen status="Pending" />;
    const PreviousOrders = () => <CurrentOrderScreen status="Done" />;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
            <View style={styles.headerContainer }>

                <View />

                <Logo height={50} width={100} />

                {/* Invisible placeholder to balance the layout */}
                <View />
            </View>
            <Tab.Navigator
                initialRouteName="CurrentOrder"
                screenOptions={{
                    tabBarActiveTintColor: myColors.text,
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarStyle: {backgroundColor : myColors.primary},
                }}
            >
                <Tab.Screen
                    name="CurrentOrder"
                    component={CurrentOrders}
                    options={{ tabBarLabel: 'Current Orders' }}
                />
                <Tab.Screen
                    name="PreviousOrders"
                    component={PreviousOrders}
                    options={{ tabBarLabel: 'Previous Orders' }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const getStyles = (myColors) => StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 0,
        backgroundColor: myColors.primary

    },


});

export default MyOrdersScreen;
