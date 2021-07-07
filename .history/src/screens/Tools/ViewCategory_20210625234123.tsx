import React from "react";
import { ScrollView, FlatList, View, Dimensions } from "react-native";
import ListCategory from "./listCategory";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Button } from "react-native-elements";

const windowHeight = Dimensions.get('window').height;

const ViewCategory = (props: { dataCat: any; }) => {
    const dispatch = useDispatch()
    const [dataCatStore, setDataCatStore] = React.useState([])
    const [storedData, setStoredData] = React.useState([])
    const [refreshedKey, setRefreshedKey] = React.useState(0)
    const Photo = useSelector(state => state.Photo)
    const Master = useSelector(state => state.Master)

    React.useEffect(() => {
        dispatch({
            type: 'SET_OPEN_PHOTO', payload: {
                mode: 'photo',
                openCamera: false
            }
        })

        if (props) {
            setDataCatStore(props.dataCat)
        }

        if (Photo.openCamera === true) {
            Actions.openPhoto()
        }

        if (Photo.photoList && Photo.photoList.length > 0) {
            if (Master.bafChooser) {
                const hasilPhoto = Photo.photoList

                const data: any = []
                hasilPhoto.map((val: any) => {
                    data.push({
                        id: Master.bafChooser.id,
                        photo: val,
                        status: 'nok'
                    })
                })

                const datacheck = storedData.filter(val => val.id !== Master.bafChooser.id)

                setStoredData([...datacheck, ...data])
                setRefreshedKey(refreshedKey + 1)
            }
        }

        if (Master.deletedPhotoBafId) {
            console.log(Master.deletedPhotoBafId)
            const datacheck = storedData.filter(val => val.id !== Master.deletedPhotoBafId)
            setStoredData(datacheck)
            setRefreshedKey(refreshedKey + 1)
        }
    }, [
        props,
        JSON.stringify(Photo.openCamera),
        JSON.stringify(Photo.photoList),
        JSON.stringify(Master.deletedPhotoBafId)
    ])

    const onsubmit = () => {
        console.log()
    }

    return <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, top: 30, height: windowHeight - 50 }}>
            <FlatList
                data={dataCatStore}
                removeClippedSubviews={true}
                initialNumToRender={5}
                key={refreshedKey}
                renderItem={
                    ({ item, index }) => <ListCategory dataCat={item} stored={storedData} key={index} />
                } />
        </ScrollView>
        <Button 
            title={'Save Data'}
            onPress={() => onsubmit()}
        />
    </View>
}

export default ViewCategory