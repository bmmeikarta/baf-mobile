import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Icon, ListItem, Badge, Header, Tab, TabView } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { FlatGrid } from 'react-native-super-grid'

import { useDispatch, useSelector } from "react-redux"

const windowWidth = Dimensions.get('window').width;

const Schedule = () => {
    const Master = useSelector(state => state.Master)

    const carouselRef = React.useRef(null)
    const [listTower, setListTower] = React.useState([])
    const [listFloor, setListFloor] = React.useState([])
    const [scheduleUser, setScheduleUser] = React.useState({})
    const [indexTower, setIndexTower] = React.useState('')

    React.useEffect(() => {
        onChooseBlocks(Master.mkrt_unit[Object.keys(Master.mkrt_unit)[0]])

        if (Master.schedule_now) {
            console.log(Master.schedule_now)
            setScheduleUser(Master.schedule_now)
        }
    }, [JSON.stringify(Master.schedule_now)])

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ padding: 5 }}>
                <View style={{
                    backgroundColor: '#ff983d',
                    borderRadius: 10,
                    height: 150,
                    marginLeft: 5,
                    marginRight: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 30 }}>Block {item}</Text>
                    {/* <Badge
                        status="success"
                        containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                        value={scheduleUser.floor ? scheduleUser.floor.filter(fil => fil.tower == item).length : 0}
                    /> */}
                </View>
            </View>
        );
    }

    const onChooseBlocks = (datanya) => {
        setListTower(datanya)
        setListFloor([])
    }

    const onChooseTower = (idnya) => {
        setListFloor(listTower[idnya])
        setIndexTower(idnya)
    }

    return (
        <View style={styles.container}>
            <Header
                leftComponent={<Icon
                    name='chevron-left'
                    type='font-awesome'
                    size={20}
                    color="white"
                    onPress={() => Actions.pop()} />
                }
                centerComponent={{ text: 'Schedule', style: { color: '#fff' } }}
                barStyle="light-content"
            />
            <View style={{ padding: 10 }}>
                <Carousel
                    ref={carouselRef}
                    data={Object.keys(Master.mkrt_unit)}
                    renderItem={renderItem}
                    sliderWidth={windowWidth}
                    itemWidth={200}
                    onSnapToItem={(id: string | number) => onChooseBlocks(Master.mkrt_unit[Object.keys(Master.mkrt_unit)[id]])}
                />
                <FlatGrid
                    itemDimension={130}
                    data={Object.keys(listTower)}
                    style={styles.containerContent}
                    // staticDimension={300}
                    // fixed
                    spacing={10}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => onChooseTower(Object.keys(listTower)[index])}>
                            <View style={[styles.itemContainer, indexTower === Object.keys(listTower)[index] ? { backgroundColor: '#1abc9c', opacity: 0.5 } : { backgroundColor: '#1abc9c' }]}>
                                <Text style={styles.itemName}>{Object.keys(listTower)[index]}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <ScrollView style={{ height: '60%', top: 10 }}>
                    {
                        listFloor && listFloor.length > 0 ?
                            listFloor.map((val, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    containerStyle={{
                                        backgroundColor: val.status === 'exists'
                                            ? scheduleUser.floor && scheduleUser.floor.filter(fil => fil.floor == val.floor && fil.tower == val.tower).length > 0
                                                ? 'green'
                                                : 'white'
                                            : 'black'
                                    }}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title
                                            style={{
                                                color: val.status === 'exists'
                                                    ? scheduleUser.floor && scheduleUser.floor.filter(fil => fil.floor == val.floor && fil.tower == val.tower).length > 0
                                                        ? 'white'
                                                        : 'black'
                                                    : 'white'
                                            }}
                                        >Floor {val.floor}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron
                                        name={scheduleUser.floor && scheduleUser.floor.filter(fil => fil.floor == val.floor && fil.tower == val.tower).length > 0
                                            ? "lock-open"
                                            : "lock"}
                                        type='material'
                                        color={scheduleUser.floor && scheduleUser.floor.filter(fil => fil.floor == val.floor && fil.tower == val.tower).length > 0
                                            ? 'white'
                                            : 'black'
                                        }
                                    />
                                </ListItem>
                            ))
                            : null
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff'
    },
    containerContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    contactItemStyle: {
        height: 40, width: '50%'
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 50,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        alignContent: 'center',
        textAlign: 'center'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
})

export default Schedule