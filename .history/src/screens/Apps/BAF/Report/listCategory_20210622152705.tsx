import React from 'react'
import { Text, Header, Icon, Button, CheckBox, ListItem } from "react-native-elements";
import ListCategoryChild from './listCategory';

const ListCategory = (props: any) => {
    const [expanded, setExpanded] = React.useState(false)
    const [data, setData] = React.useState({})

    React.useEffect(() => {
        if (props.dataCat) {
            setData(props.dataCat)
            console.log(props.dataCat.baf_cat_name)
        }
    }, [JSON.stringify(props)])

    return <>
    {
        data.child.length > 0
        ? <ListItem.Accordion
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
            {
                data.child && data.child.map(val => 
                    <ListCategoryChild dataCat={val}/>
                )
            }
        </ListItem.Accordion>
        : <ListItem bottomDivider>
            <ListItem.Content>
            <ListItem.Title>{data.baf_cat_name}</ListItem.Title>
            <ListItem.Subtitle>Category</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    }
    
    </>
}

export default ListCategory