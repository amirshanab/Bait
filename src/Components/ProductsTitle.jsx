import {Text,View} from "react-native";
import { myColors as color} from "../Utils/MyColors";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const ProductsTitle = ({title}) => {
    const [theme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    return (
        <View
            style={{flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            paddingHorizontal:15,
            marginTop:10}}>


            <Text style={{fontSize:20, fontWeight:"bold", color:myColors.text}}>{title}</Text>

        </View>
    );
}

export default ProductsTitle;
