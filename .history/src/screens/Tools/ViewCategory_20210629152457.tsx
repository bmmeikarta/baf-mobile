import React from "react";
import { ScrollView, FlatList, View, Dimensions, Text, Alert } from "react-native";
import ListCategory from "./listCategory";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Button } from "react-native-elements";

const windowHeight = Dimensions.get('window').height;

const ViewCategory = (props: { dataCat: React.SetStateAction<never[]>; dataPhoto: React.SetStateAction<never[]>; }) => {

    return <View style={{ flex: 1 }}>
        <Text>Masuk sini</Text>
    </View>
}

export default ViewCategory