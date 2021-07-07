import React from 'react'

import { Text } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Header, Icon } from 'react-native-elements'
import { FlatGrid } from 'react-native-super-grid'
import SnackBar from 'react-native-snackbar-component'

import LoadingReport from './loading'
import HeaderAssign from './Header'

const windowHeight = Dimensions.get('window').height;

const Report = () => {
    const Master = useSelector(state => state.Master)
    const dispatch = useDispatch()

    const [scheduleUser, setScheduleUser] = React.useState({})
    const [choosedBlock, setChoosedBlock] = React.useState('')
    const [choosedTower, setChoosedTower] = React.useState('')
    const [listFloor, setListFloor] = React.useState([])

    const [snackAlert, setSnackAlert] = React.useState('')
    const [showSnack, setShowSnack] = React.useState(false)

    React.useEffect(() => {
        if (Master.mkrt_unit && Object.keys(Master.mkrt_unit).length > 0) {    
            if (Master.schedule_now) {
                if (Master.mkrt_unit[Master.schedule_now.unit_blocks]) {
                    setListFloor(Master.mkrt_unit[Master.schedule_now.unit_blocks][Master.schedule_now.unit_tower])
                }
                setChoosedBlock(Master.schedule_now.unit_blocks)
                setChoosedTower(Master.schedule_now.unit_tower)
                setScheduleUser(Master.schedule_now)
            }
        }
    }, [JSON.stringify(Master.schedule_now)])

    const onOpenFloors = (data) => {
        if (data.status !== 'exists') {
            setSnackAlert("This floor unavailable !")
            setShowSnack(true)
        } else {
            if (scheduleUser.floor.filter(fil => fil.floor == data.floor && fil.tower == data.tower && fil.blocks == data.blocks).length > 0) {
                dispatch({ type: 'SET_CHOOSED_FLOOR', payload: data })
                if (data.floor !== 'Lift') {
                    Actions.chooseZone()
                } else {
                    dispatch({ type: 'SET_SCAN_ZONE', payload: '' })
                    Actions.bafReport()
                }
            } else {
                setSnackAlert("It's not your schedule, please choose other floor !")
                setShowSnack(true)
            }
        }
    }

    return (
        <View style={styles.container}>
            <SnackBar 
                visible={showSnack} 
                textMessage={snackAlert}
                actionHandler={() => { setShowSnack(false) }}
                actionText="Okay" 
                messageStyle={{backgroundColor: 'red'}}
                actionStyle={{backgroundColor: 'red', color: 'white'}}
            />
            <HeaderAssign 
            title={'Choose Floor'}
            zone={false}
            tower={true}
        />

            <View style={{
                flexDirection: 'column',
                flexWrap: 'wrap',
            }}>
                {
                    Object.keys(scheduleUser).length > 0
                        ? <>
                            <ScrollView style={{ height: windowHeight - 150, top: 50, width: '100%' }}>
                                {
                                    listFloor.length > 0
                                        ? <FlatGrid
                                            itemDimension={110}
                                            data={listFloor}
                                            style={styles.containerContent}
                                            spacing={10}
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity key={index} onPress={() => onOpenFloors(item)}>
                                                    <View style={[
                                                        styles.itemContainerList,
                                                        item.status === 'exists'
                                                            ? scheduleUser.floor.filter(fil => fil.floor == item.floor && fil.tower == item.tower && fil.blocks == item.blocks).length > 0
                                                                ? { backgroundColor: '#1abc9c' }
                                                                : { backgroundColor: 'red' }
                                                            : { backgroundColor: '#000' }
                                                    ]}>
                                                        <Text style={styles.itemName}>{item.floor}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                        />
                                        : null
                                }
                            </ScrollView>
                        </>
                        : <LoadingReport />
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

export default Report