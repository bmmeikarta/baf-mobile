import React from 'react'
import { Text, Header, Icon, Button, CheckBox, ListItem } from "react-native-elements";
import ListCategoryChild from './listCategory';

const ListCategory = (props: any) => {
    const [expanded, setExpanded] = React.useState(false)
    const [data, setData] = React.useState({})

    React.useEffect(() => {
        if (props.dataCat) {
            setData(props.dataCat)
            console.log(props.dataCat)
        }
    }, [JSON.stringify(props)])

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
                    <ListCategoryChild dataCat={val}/>
                )
            }
        </ListItem.Accordion>
        : <ListItem bottomDivider>
            <ListItem.Content>
            <ListItem.Title>{data.baf_cat_name}</ListItem.Title>
            <ListItem.Subtitle>Category</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron 
                name="add-a-photo"
                reverse
                color="cyan"
            />
        </ListItem>
    }
    
    </>
}

export default ListCategory