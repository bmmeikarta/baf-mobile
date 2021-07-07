import React from 'react'
import { Text, Header, Icon, Button, CheckBox, ListItem } from "react-native-elements";

const ListCategory = (props: any) => {
    const [expanded, setExpanded] = React.useState(false)
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        if (props.dataCat) {
            console.log(props.dataCat.baf_cat_name)
        }
    }, [JSON.stringify(props)])

    return <ListItem.Accordion
        content={
        <>
            <Icon name="place" size={30} />
            <ListItem.Content>
            <ListItem.Title>List Accordion</ListItem.Title>
            </ListItem.Content>
        </>
        }
        isExpanded={expanded}
        onPress={() => {
            setExpanded(!expanded);
        }}
    >

    </ListItem.Accordion>
}

export default ListCategory