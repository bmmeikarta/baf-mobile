import React from "react";
import { ScrollView, Text } from "react-native";
import ListCategory from "./listCategory";
import { useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";

const ViewCategory = (props: { dataCat: any; }) => {
    const [dataCatStore, setDataCatStore] = React.useState([])
    const Photo = useSelector(state => state.Photo)

    React.useEffect(() => {
        if (props) {
            setDataCatStore(props.dataCat)
            console.log(props.dataCat)
        }

        if (Photo.openCamera) {
            Actions.openPhoto()
        }
    }, [
        props,
        JSON.stringify(Photo.openCamera)
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