import React from "react";
import { ScrollView, Text } from "react-native";
import ListCategory from "./listCategory";
import { useSelector } from "react-redux";

const ViewCategory = (props: { dataCat: any; }) => {
    const [dataCatStore, setDataCatStore] = React.useState([])
    const Photo = useSelector(state => state.Photo)

    React.useEffect(() => {
        if (props) {
            setDataCatStore(props.dataCat)
            console.log(props.dataCat)
        }
    }, [
        props,
        JSON.stringify()
    ])
    return <ScrollView style={{flex: 1, top: 30}}>
        {
            dataCatStore.map(val => 
                <ListCategory dataCat={val} />
            )
        }
    </ScrollView>
}

export default ViewCategory