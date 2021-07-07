import React from "react";
import { Header, Icon } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";

const HeaderAssign = (props) => {
    const dispatch = useDispatch()

    const Master = useSelector(state => state.Master)
    const Auth = useSelector(state => state.AuthInfo)
    const [scheduleUser, setScheduleUser] = React.useState({})

    React.useEffect(() => {
        if (Object.keys(Master.mkrt_unit).length > 0) {
            if (Master.schedule_now) {
                setScheduleUser(Master.schedule_now)
            }
        }
    }, [JSON.stringify(Master.schedule_now)])

    return <>
        <Header
            leftComponent={<Icon
                name='chevron-left'
                type='font-awesome'
                size={20}
                color="white"
                onPress={() => {
                    Actions.pop()
                    setTimeout(() => {
                        Actions.refresh({
                           p :Math.random()
                        });
                    }, 0);
                }} />
            }
            centerComponent={{ text: props.title, style: { color: '#fff' } }}
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
                                props.tower === true
                                    ? Master.mkrt_unit && Master.mkrt_unit[scheduleUser.unit_blocks]
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
                                    : <> 
                                    <View style={{ width: `50%` }}>
                                        <View style={[styles.itemContainer, { backgroundColor: '#1abc9c' }]}>
                                            <Text style={styles.itemName}>{scheduleUser.unit_tower}</Text>
                                        </View>
                                    </View>
                                        <View style={{ width: `50%` }}>
                                            <View style={[styles.itemContainer, { backgroundColor: 'orange' }]}>
                                                <Text style={styles.itemName}>Floor {Master.choosedFloor.floor}</Text>
                                            </View>
                                        </View>
                                    </>
                            }
                        </View>
                        {
                            props.zone === true
                                ? <View style={[styles.itemContainer, { backgroundColor: 'grey', top: 70 }]}>
                                    <Text style={styles.itemName}>Zone {Master.choosedZone}</Text>
                                </View>
                                : null
                        }
                    </ View>
                    : null
            }
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff'
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
})

export default HeaderAssign