import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native'
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
    const [indexTower, setIndexTower] = React.useState(0)

    React.useEffect(() => {
        console.log(Master)
    }, [])

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
                    onSnapToItem={(id: string | number) => setListTower(Master.mkrt_unit[Object.keys(Master.mkrt_unit)[id]])}
                />
                <FlatGrid
                    itemDimension={130}
                    data={Object.keys(listTower)}
                    style={styles.containerContent}
                    // staticDimension={300}
                    // fixed
                    spacing={10}
                    renderItem={({ item, index }) => (
                        <View style={[styles.itemContainer, { backgroundColor: '#e67e22' }]}>
                            <Text style={styles.itemName}>Tester</Text>
                            <Text style={styles.itemCode}>{index}</Text>
                        </View>
                    )}
                />
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
        height: 100, width: '50%'
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
})

export default Schedule