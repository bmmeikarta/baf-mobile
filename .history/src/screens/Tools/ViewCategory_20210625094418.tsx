import React from "react";
import { ScrollView, View } from "react-native";
import ListCategory from "./listCategory";

const ViewCategory = (props: { dataCat: any; }) => {
    const [dataCatStore, setDataCatStore] = React.useState([])

    React.useEffect(() => {
        if (props) {
            setDataCatStore(props.dataCat)
            console.log(props.dataCat)
        }
    }, [props])
    return <ScrollView style={{flex: 1, top: 30}}>
        <ListCategory dataCat={dataCatStore} />
    </ScrollView>
}

export default ViewCategory