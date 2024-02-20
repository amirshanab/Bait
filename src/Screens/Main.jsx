import React from "react";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../Utils/MyColors";

const Main = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
            <StatusBar style={'light'} />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 30, paddingBottom: 100 }}>

                {/* Logo */}
                <Image
                    style={{ height: 200, width: 350, borderColor: 'black', borderWidth: 2, alignSelf: 'center' }}
                    source={require('../assets/logo.jpg')} />

                {/* Title */}
                <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                    <Text style={{ color: 'black', fontSize: 26, fontWeight: '700', textAlign: 'center' }}>Welcome to Main</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 5, textAlign: 'center' }}>Explore our amazing features</Text>
                </View>

                {/* Feature 1 */}
                <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '700' }}>Feature 1</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 5 }}>Description of Feature 1</Text>
                </View>

                {/* Feature 2 */}
                <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '700' }}>Feature 2</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 5 }}>Description of Feature 2</Text>
                </View>

                {/* Feature 3 */}
                <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '700' }}>Feature 3</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 5 }}>Description of Feature 3</Text>
                </View>

                {/* Feature 4 */}
                <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '700' }}>Feature 4</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 5 }}>Description of Feature 4</Text>
                </View>

                {/* Feature 5 */}
                <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '700' }}>Feature 5</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 5 }}>Description of Feature 5</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default Main;
