import React from 'react'

import { Text } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Header, Icon } from 'react-native-elements'
import { FlatGrid } from 'react-native-super-grid'
import SnackBar from 'react-native-snackbar-component'

import LoadingReport from './loading'

const Report = () => {
    const Master = useSelector(state => state.Master)

    const [scheduleUser, setScheduleUser] = React.useState({})
    const [choosedBlock, setChoosedBlock] = React.useState('')
    const [choosedTower, setChoosedTower] = React.useState('')
    const [listFloor, setListFloor] = React.useState([])

    const [showSnack, setShowSnack] = React.useState(false)

    React.useEffect(() => {
        setListFloor(Master.mkrt_unit[Master.schedule_now.unit_blocks][Master.schedule_now.unit_tower])
        setChoosedBlock(Master.schedule_now.unit_blocks)
        setChoosedTower(Master.schedule_now.unit_tower)

        if (Master.schedule_now) {
            setScheduleUser(Master.schedule_now)
        }
    }, [JSON.stringify(Master.schedule_now)])

    const onOpenFloors = (data) => {
        console.log('masuk sini bos')
        setShowSnack(true)
    }

    return (
        <View style={styles.container}>
            <SnackBar 
                visible={showSnack} 
                textMessage="Hello There!" 
                actionHandler={() => { console.log("snackbar button clicked!") }}
                actionText="let's go" 
            />
            <Header
                leftComponent={<Icon
                    name='chevron-left'
                    type='font-awesome'
                    size={20}
                    color="white"
                    onPress={() => Actions.pop()} />
                }
                centerComponent={{ text: 'Report', style: { color: '#fff' } }}
                barStyle="light-content"
            />

            <View style={{
                padding: 10,
                flexDirection: 'column',
                flexWrap: 'wrap',
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
                            <ScrollView style={{ height: '80%', top: 20 }}>
                                {
                                    listFloor.length > 0
                                        ? <FlatGrid
                                            itemDimension={100}
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