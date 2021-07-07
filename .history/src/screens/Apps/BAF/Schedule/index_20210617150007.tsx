import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Icon, ListItem, Badge, Header } from 'react-native-elements'

import { useDispatch, useSelector } from "react-redux"

const windowWidth = Dimensions.get('window').width;

const Schedule = () => {
    const Master = useSelector(state => state.Master)

    const carouselRef = React.useRef(null)
    const [listTower, setListTower] = React.useState([])
    const [listFloor, setListFloor] = React.useState([])
    const [scheduleUser, setScheduleUser] = React.useState({})

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
                    <Text style={{ fontSize: 30 }}>Tower {item}</Text>
                    <Badge
                        status="success"
                        containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                        value={scheduleUser.floor ? scheduleUser.floor.filter(fil => fil.tower == item).length : 0}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header
                leftComponent={{}}
                centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
                rightComponent={connection
                    ? { icon: 'wifi', color: '#fff' }
                    : { icon: 'wifi-off', color: '#fff' }
                }
                containerStyle={{
                    backgroundColor: '#3D6DCC',
                    justifyContent: 'space-around',
                }}
                barStyle="light-content"
            />
            <View style={{ padding: 10 }}>
                {/* <Carousel
                    ref={carouselRef}
                    data={Object.keys(listTower)}
                    renderItem={renderItem}
                    sliderWidth={windowWidth}
                    itemWidth={200}
                    onSnapToItem={(id: string | number) => setListFloor(listTower[Object.keys(listTower)[id]])}
                /> */}
                {
                    Object.keys(Master.mkrt_unit).map(val => <Text>{val}</Text>)
                }
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
})

export default Schedule