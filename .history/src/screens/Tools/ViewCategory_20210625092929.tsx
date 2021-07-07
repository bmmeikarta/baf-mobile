import React from "react";
import { ScrollView, View } from "react-native";
import ListCategory from "./listCategory";

const ViewCategory = (props) => {
    return <ScrollView style={{flex: 1}}>
        <ListCategory dataCat={props.dataCat} />
    </ScrollView>
}

export default ViewCategory