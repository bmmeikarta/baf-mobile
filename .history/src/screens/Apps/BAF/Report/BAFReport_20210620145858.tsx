import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Header, Icon, Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import Carousel from 'react-native-snap-carousel'

const BAFReport = () => {
    const Master = useSelector(state => state.Master)
    const dispatch = useDispatch()

    const carouselRef = React.useRef(null)
    const [scheduleUser, setScheduleUser] = React.useState({})

    React.useEffect(() => {
        if (Object.keys(Master.mkrt_unit).length > 0) {
            if (Master.schedule_now) {
                setScheduleUser(Master.schedule_now)
            }
        }
    }, [JSON.stringify(Master.schedule_now)])

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
                centerComponent={{ text: 'Update BAF', style: { color: '#fff' } }}
                barStyle="light-content"
            />

            <View style={{
                padding: 10,
                flexDirection: 'column',
                flexWrap: 'wrap'
            }}>
                {
                    Object.keys(scheduleUser).length > 0
                        ? <View>
                            <View style={[styles.itemContainer, { backgroundColor: '#1abc9c' }]}>
                                <Text style={styles.itemName}>{scheduleUser.unit_blocks}</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: 'flex-start',
                                top: 10
                            }}>
                                {
                                    Master.mkrt_unit[scheduleUser.unit_blocks]
                                        ? Object.keys(Master.mkrt_unit[scheduleUser.unit_blocks]).map(val => (
                                            <>
                                                <View style={{ width: `${100 / Object.keys(Master.mkrt_unit[scheduleUser.unit_blocks]).length}%` }}>
                                                    <View style={[styles.itemContainer, scheduleUser.unit_tower == val ? { backgroundColor: '#1abc9c', opacity: 0.5 } : { backgroundColor: '#1abc9c' }]}>
                                                        <Text style={styles.itemName}>{val}</Text>
                                                    </View>
                                                </View>
                                            </>
                                        ))
                                        : null
                                }
                            </View>

                            <View style={[styles.itemContainer, { backgroundColor: '#1abc9c', top: 60 }]}>
                                <Text style={styles.itemName}>{scheduleUser.unit_blocks}</Text>
                            </View>
                        </ View>
                        : null
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
    itemContainerList: {
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

export default BAFReport