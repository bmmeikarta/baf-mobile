import React from 'react'
import { Text, Header, Icon, Button, Badge, ListItem } from "react-native-elements";
import ListCategoryChild from './listCategory';
import { useDispatch, useSelector } from 'react-redux';
const ListCategory = (props: any) => {
    const dispatch = useDispatch()
    const Master = useSelector(state => state.Master)

    const [expanded, setExpanded] = React.useState(false)
    const [data, setData] = React.useState({})
    const [listPhoto, setListPhoto] = React.useState([])

    React.useEffect(() => {
        if (props.dataCat) {
            setData(props.dataCat)
            console.log(props.dataCat)
        }

        if (Master.historyStore) {
            setListPhoto(Master.historyStore)
        }
    }, [
        JSON.stringify(props),
        JSON.stringify(Master.historyStore)
    ])

    const openPhoto = (mode: any, state: any, data: any) => {
        dispatch({type: 'SET_SELECTED_CAT_ID', payload: data})
        dispatch({ type: 'SET_OPEN_PHOTO', payload: {
            mode: mode,
            openCamera: state
            } 
        })
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
                        data.child.map(val =>
                            <ListCategoryChild dataCat={val} />
                        )
                    }
                </ListItem.Accordion>
                : <ListItem bottomDivider>
                    <Badge status="warning" value={listPhoto.filter(val => val.baf_cat_id === data.id && val.baf_status === 'nok').length}/>
                    <ListItem.Content>
                        <ListItem.Title>{data.baf_cat_name}</ListItem.Title>
                        <ListItem.Subtitle>Category</ListItem.Subtitle>
                    </ListItem.Content>
                    {
                        data.baf_is_photo
                            ? <>
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