import React from "react";
import { ScrollView, Text } from "react-native";
import ListCategory from "./listCategory";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "react-native-router-flux";

const ViewCategory = (props: { dataCat: any; }) => {
    const dispatch = useDispatch()
    const [dataCatStore, setDataCatStore] = React.useState([])
    const [storedData, setStoredData] = React.useState([])
    const Photo = useSelector(state => state.Photo)
    const Master = useSelector(state => state.Master)

    React.useEffect(() => {
        dispatch({ type: 'SET_OPEN_PHOTO', payload: {
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

                const data:any = []
                hasilPhoto.map((val: any) => {
                    data.push({
                        id: Master.bafChooser.id,
                        photo: val,
                        status: 'nok'
                    })
                })

                setStoredData([...hasilPhoto, data])

                console.log(storedData)
            }
        }
    }, [
        props,
        JSON.stringify(Photo.openCamera),
        JSON.stringify(Photo.photoList)
    ])
    return <ScrollView style={{flex: 1, top: 30}}>
        {
            dataCatStore.map(val => 
                <ListCategory dataCat={val} stored={storedData}/>
            )
        }
    </ScrollView>
}

export default ViewCategory