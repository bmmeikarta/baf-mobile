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
                mode: 'photo',
                openCamera: false
            }
        })

        if (props.dataCat) {
            setDataCatStore(props.dataCat)
        }

        if (props.dataPhoto) {
            setStoredData(props.dataPhoto)
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
    }, [
        props,
        JSON.stringify(Photo.openCamera),
        JSON.stringify(Photo.photoList)
    ])

    React.useEffect(() => {
        if (Master.deletedPhotoBafId) {
            const datacheck = storedData.filter(val => val.id !== Master.deletedPhotoBafId)
            setStoredData(datacheck)
            setRefreshedKey(refreshedKey + 1)
        }
    }, [
        Master.deletedPhotoBafId
    ])

    const onsubmit = () => {
        Alert.alert(
            "Cancel Data",
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
                        dispatch({type: 'SET_OPEN_PHOTO', payload: storedData})
                
                        Actions.pop()
                    }
                }
            ]
        )
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
        <Text>{Master.deletedPhotoBafId}</Text>
        <Button 
            title={'Save Data'}
            onPress={() => onsubmit()}
        />
    </View>
}

export default ViewCategory