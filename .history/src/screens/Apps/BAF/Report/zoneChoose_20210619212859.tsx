import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Header, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import Svg, { Circle, Rect } from 'react-native-svg'

const ZoneChoose = () => {
    const Master = useSelector(state => state.Master)
    const dispatch = useDispatch()

    const [scheduleUser, setScheduleUser] = React.useState({})
    const [choosedBlock, setChoosedBlock] = React.useState('')
    const [choosedTower, setChoosedTower] = React.useState('')

    React.useEffect(() => {
        if (Object.keys(Master.mkrt_unit).length > 0) {
            setChoosedBlock(Master.schedule_now.unit_blocks)
            setChoosedTower(Master.schedule_now.unit_tower)

            if (Master.schedule_now) {
                setScheduleUser(Master.schedule_now)
            }
        }
    }, [JSON.stringify(Master.schedule_now)])

    return <View style={styles.container}>
        <Header
            leftComponent={<Icon
                name='chevron-left'
                type='font-awesome'
                size={20}
                color="white"
                onPress={() => Actions.pop()} />
            }
            centerComponent={{ text: 'Choose Zone', style: { color: '#fff' } }}
            barStyle="light-content"
        />

        <View style={{
            padding: 10,
            flexDirection: 'column',
            flexWrap: 'wrap'
        }}>
            {
                Object.keys(scheduleUser).length > 0
                    ? <>
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
                    </>
                    : null
            }
        </View>

        <View style={{
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent:'center',
            height: '80%',
            backgroundColor: 'red'
        }}>
            <Svg width="300" height="300">
                <Rect
                    x="50"
                    y="20"
                    width="50"
                    height="80"
                    fill="blue"
                />      
                <Rect
                    x="50"
                    y="100"
                    width="170"
                    height="50"
                    fill="#ffcea1"
                />   
                <Rect
                    x="50"
                    y="150"
                    width="50"
                    height="80"
                    fill="green"
                />   
                <Rect
                    x="220"
                    y="60"
                    width="50"
                    height="120"
                    fill="orange"
                />       

                <Text
                    x="50"
                    y="20"
                >Zone 2</Text>
            </Svg>
        </View>
    </View>
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

export default ZoneChoose