import React from 'react'
import { Text, Header, Icon, Button, CheckBox, ListItem } from "react-native-elements";

const ListCategory = (props: any) => {
    const [expanded, setExpanded] = React.useState(false)
    
    React.useEffect(() => {
        console.log(props)
    }, [props])

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