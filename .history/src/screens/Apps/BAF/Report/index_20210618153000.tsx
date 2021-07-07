import React from 'react'

import { Text } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Header, Icon } from 'react-native-elements'
import { FlatGrid } from 'react-native-super-grid'

import LoadingReport from './loading'

const Report = () => {
    const Master = useSelector(state => state.Master)

    const [scheduleUser, setScheduleUser] = React.useState({})
    const [choosedBlock, setChoosedBlock] = React.useState('')
    const [choosedTower, setChoosedTower] = React.useState('')
    const [listFloor, setListFloor] = React.useState([])

    React.useEffect(() => {
        setListFloor(Master.mkrt_unit[Master.schedule_now.unit_blocks][Master.schedule_now.unit_tower])
        setChoosedBlock(Master.schedule_now.unit_blocks)
        setChoosedTower(Master.schedule_now.unit_tower)

        if (Master.schedule_now) {
            setScheduleUser(Master.schedule_now)
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
                centerComponent={{ text: 'Report', style: { color: '#fff' } }}
                barStyle="light-content"
            />

            <View style={{ padding: 10 }}>
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
                        ? <LoadingReport />
                        : <LoadingReport />
                    }

                    {
                        Master.mkrt_unit[scheduleUser.unit_blocks]
                        ? <FlatGrid
                            itemDimension={130}
                            data={Master.mkrt_unit[scheduleUser.unit_blocks][scheduleUser.unit_tower]}
                            style={styles.containerContent}
                            spacing={10}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity key={index}>
                                    <View style={[styles.itemContainer, { backgroundColor: '#1abc9c' }]}>
                                        <Text style={styles.itemName}>{item.floor}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        : <LoadingReport />
                    }
                </View>
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

export default Report