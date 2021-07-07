import React from "react";
import { ScrollView, FlatList, View, Dimensions, Text, Alert } from "react-native";
import ListCategory from "./listCategory";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Button } from "react-native-elements";

const windowHeight = Dimensions.get('window').height;

const ViewCategory = (props: { dataCat: React.SetStateAction<never[]>; dataPhoto: React.SetStateAction<never[]>; }) => {
    const dispatch = useDispatch()
    const [dataCatStore, setDataCatStore] = React.useState([])
    const [storedData, setStoredData] = React.useState([])
    const [refreshedKey, setRefreshedKey] = React.useState(0)
    const Photo = useSelector(state => state.Photo)
    const Master = useSelector(state => state.Master)

    React.useEffect(() => {
        dispatch({
            type: 'SET_OPEN_PHOTO', payload: {
                mode: false,
                autoSubmit: Photo.autoSubmit,
                openCamera: false
            }
        })

        if (props.dataCat) {
            setDataCatStore(props.dataCat)
        }

        if (Photo.openCamera === true) {
            Actions.openPhoto()
        }

        console.log(storedData)
    }, [
        props,
        JSON.stringify(Photo.openCamera)
    ])

    React.useEffect(() => {
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
                // setRefreshedKey(refreshedKey + 1)
                dispatch({ type: 'SET_LIST_PHOTO', payload: [] })
            }
        }
    }, [JSON.stringify(Photo.photoList)])

    React.useEffect(() => {
        console.log(Photo)
        if (Photo.scanList && Photo.scanList.length > 0) {
            console.log('masuk kesini nih')
            if (Master.bafChooser) {
                const hasilScan = Photo.scanList

                const data: any = []
                hasilScan.map((val: any) => {
                    data.push({
                        id: Master.bafChooser.id,
                        scan: val,
                        status: 'nok'
                    })
                })

                const datacheck = storedData.filter(val => val.id !== Master.bafChooser.id)

                setStoredData([...datacheck, ...data])
                // setRefreshedKey(refreshedKey + 1)
                dispatch({ type: 'SET_LIST_SCAN', payload: [] })
            }
        }
    }, [JSON.stringify(Photo)])

    React.useEffect(() => {
        if (Master.deletedPhotoBafId) {
            const datacheck = storedData.filter(val => val.id !== Master.deletedPhotoBafId)
            setStoredData(datacheck)
            setRefreshedKey(refreshedKey + 1)
        }
    }, [
        Master.deletedPhotoBafId
    ])

    React.useEffect(() => {
        if (props.dataPhoto) {
            console.log(props.dataPhoto.length)
            setStoredData(props.dataPhoto)
        }
    }, [JSON.stringify(props.dataPhoto)])

    const onsubmit = () => {
        Alert.alert(
            "Submit Data",
            "Apakah anda ingin submit data - data ini ?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Submit",
                    onPress: () => {
                        dispatch({ type: 'SET_STORE_PHOTO_LIST', payload: storedData })

                        Actions.pop()
                    }
                }
            ]
        )
    }

    const renderItem = ({ item, index }) => {
        return <ListCategory dataCat={item} stored={storedData} key={index} />
    }

    return <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, top: 30}}>
            <View style={{height: windowHeight - 30}}>
            <FlatList
                data={dataCatStore}
                removeClippedSubviews={true}
                initialNumToRender={5}
                key={refreshedKey}
                renderItem={renderItem} />
            </View>
        </ScrollView>
        <Button
            title={'Save Data'}
            onPress={() => onsubmit()}
            disabled={storedData.length === 0}
        />
    </View>
}

export default ViewCategory