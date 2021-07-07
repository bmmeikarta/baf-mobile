import React from 'react'
import { Alert } from 'react-native';
import { Text, Header, Icon, Button, Badge, ListItem } from "react-native-elements";
import ListCategoryChild from './listCategory';
import { useDispatch, useSelector } from 'react-redux';
const ListCategory = (props: any) => {
    const dispatch = useDispatch()
    const Master = useSelector(state => state.Master)

    const [expanded, setExpanded] = React.useState(false)
    const [data, setData] = React.useState({})
    const [listPhoto, setListPhoto] = React.useState([])
    const [storedPhoto, setStoredPhoto] = React.useState([])

    React.useEffect(() => {
        if (props.dataCat) {
            setData(props.dataCat)
        }

        if (props.stored) {
            setStoredPhoto(props.stored)
        }

        if (Master.historyStore) {
            setListPhoto(Master.historyStore)
        }
    }, [
        JSON.stringify(props),
        JSON.stringify(Master.historyStore)
    ])

    const openPhoto = (mode: any, state: any, data: any) => {
        dispatch({ type: 'SET_SELECTED_CAT_ID', payload: data })
        dispatch({
            type: 'SET_OPEN_PHOTO', payload: {
                mode: mode,
                openCamera: state
            }
        })
    }

    const deletePhoto = (id: any) => {
        Alert.alert(
            "Cancel Data",
            "Apakah anda ingin menghapus foto - foto ini ?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Hapus",
                    onPress: () => {
                        console.log(id)
                        dispatch({ type: 'SET_DELETED_ID_CAT_BAF', payload: id })
                    }
                }
            ]
        )
    }

    return <>
        {
            data.child && data.child.length > 0
                ? <ListItem.Accordion
                    content={
                        <>
                            <Icon name={expanded ? "remove" : "add"} size={30} />
                            <ListItem.Content>
                                <ListItem.Title>{data.baf_cat_name}</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={expanded}
                    onPress={() => {
                        setExpanded(!expanded);
                    }}
                >
                    {
                        expanded
                        ? data.child.map((val, index) =>
                            <ListCategoryChild dataCat={val} stored={storedPhoto} key={index}/>
                        )
                        : null
                    }
                </ListItem.Accordion>
                : <ListItem bottomDivider>
                    <Badge status="warning" textStyle={{fontSize: 15}} value={storedPhoto.filter(val => val.id === data.id).length} />
                    <ListItem.Content>
                        <ListItem.Title>{data.baf_cat_name}</ListItem.Title>
                        <ListItem.Subtitle>Category</ListItem.Subtitle>
                    </ListItem.Content>
                    {
                        data.baf_is_photo
                            ?
                            storedPhoto.filter(val => val.id === data.id).length > 0
                                ? <>
                                    <ListItem.Chevron
                                        name="remove-red-eye"
                                        reverse
                                        color="orange"
                                        size={15}
                                        onPress={() => {
                                            openPhoto('photo', true, data)
                                        }}
                                    />
                                    <ListItem.Chevron
                                        name="delete"
                                        reverse
                                        color="red"
                                        size={15}
                                        onPress={() => {
                                            deletePhoto(data.id)
                                        }}
                                    />
                                </>
                                : <>
                                    <ListItem.Chevron
                                        name="add-a-photo"
                                        reverse
                                        color="green"
                                        size={15}
                                        onPress={() => {
                                            openPhoto('photo', true, data)
                                        }}
                                    />
                                </>
                            : null
                    }
                    {
                        data.baf_is_scan
                            ? <ListItem.Chevron
                                name="qr-code-scanner"
                                reverse
                                color="green"
                                size={15}
                            />
                            : null
                    }

                </ListItem>
        }

    </>
}

export default ListCategory