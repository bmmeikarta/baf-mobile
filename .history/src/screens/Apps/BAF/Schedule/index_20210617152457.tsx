import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Icon, ListItem, Badge, Header, Tab, TabView } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

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
                    onSnapToItem={(id: string | number) => setListTower(Master.mkrt_unit[id])}
                />
                <Tab value={indexTower}>
                    <Tab.Item key={0} title="recent" onPressOut={() => setIndexTower(0)}/>
                    <Tab.Item key={1} title="favorite" onPressOut={() => setIndexTower(1)}/>
                    <Tab.Item key={2} title="cart" onPressOut={() => setIndexTower(2)}/>
                </Tab>
                <TabView value={indexTower} onChange={setIndexTower} >
                    <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                        <Text h1>                            
                            {
                                listTower.map(val => <Text>{val}</Text>)
                            }
                        </Text>
                    </TabView.Item>
                    <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                        <Text h1>Favorite</Text>
                    </TabView.Item>
                    <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                        <Text h1>Cart</Text>
                    </TabView.Item>
                </TabView>
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