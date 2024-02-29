import {Image, Text, FlatList, View} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {myColors} from "../Utils/MyColors";
import {responsiveHeight} from "react-native-responsive-dimensions";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {useDispatch, useSelector} from "react-redux";
import CartReducer from "../../Redux/CartSlice";
import {useNavigation} from "@react-navigation/native";


const Cart = () => {
    const nav = useNavigation(); // Access the navigation object
    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.cart); // Get the cart data from the store
    console.log(storeData);


    return (<SafeAreaView style={{flex: 1, paddingHorizontal: 10, backgroundColor: myColors.primary, gap: 15}}>

        {/* go back button */}
        {/* Back button */}
        <Ionicons
            onPress={() => {
                nav.goBack(); // Go back to the previous screen
            }}
            name="chevron-back"
            size={28}
            color="black"
        />


        <Text style={{textAlign: 'center', fontSize: 23, fontWeight: "500"}}>My Cart</Text>


        <FlatList data={storeData.products} renderItem={({item, index})=>(
            <View style={{
                height: responsiveHeight(15), borderBottomColor: "black", borderBottomWidth: 2, flexDirection: 'row',
            }}>
                {/* child 1 the image */}
                <View style={{flex: 0.35,
                    alignItems: "center", justifyContent: "center"}}>
                    <Image
                        style={{height: 130, width: 130, resizeMode: 'contain'}}
                        source={{uri: item.img}}/>
                </View>
                {/* child 2  */}
                <View style={{flex: 0.65, paddingHorizontal: 10, paddingVertical: 30, justifyContent: 'center'}}>

                    {/* name and the remove product button  */}
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        {/* Product name */}
                        <Text style={{fontSize: 20, fontWeight: "500"}}>{item.name}</Text>
                        {/* Remove product button */}
                        <AntDesign onPress={() => dis} name="close" size={24} color="black"/>
                    </View>
                    {/* price and quantity */}
                    <View style={{
                        marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        {/* quantity container */}
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', gap: 15
                        }}>
                            <AntDesign name="minuscircleo" size={30} color="green"/>
                            <Text style={{
                                fontSize: 20, fontWeight: "500", marginVertical: 2, opacity: 0.6
                            }}>{item.quantity}</Text>
                            <AntDesign name="pluscircleo" size={30} color="green"/>
                        </View>

                        {/* price */}
                        <Text style={{fontSize: 22, fontWeight: "500", marginHorizontal: 15}}>₪ {item.price}</Text>

                    </View>

                </View>

            </View>

        )
    }
        />


    </SafeAreaView>);
}

export default Cart;
