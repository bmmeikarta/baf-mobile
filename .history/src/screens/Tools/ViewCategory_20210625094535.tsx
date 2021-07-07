import React from "react";
import { ScrollView, Text } from "react-native";
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
        {
            dataCatStore.map(val => 
                <ListCategory dataCat={val} />
            )
        }
    </ScrollView>
}

export default ViewCategory