import {Text,View} from "react-native";
import react from "react";


const ProductsTitle = ({title}) => {
    return (
        <View
            style={{flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            paddingHorizontal:15,
            marginTop:10}}>


            <Text style={{fontSize:20, fontWeight:"bold"}}>{title}</Text>
            <Text style={{fontSize:15, color:"grey"}}>See All</Text>

        </View>
    );
}

export default ProductsTitle;
