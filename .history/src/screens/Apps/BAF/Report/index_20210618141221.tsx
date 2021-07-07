import React from 'react'

import { Text } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Header, Icon } from 'react-native-elements'
import { FlatGrid } from 'react-native-super-grid'

const Report = () => {
    const Master = useSelector(state => state.Master)

    const [scheduleUser, setScheduleUser] = React.useState({})

    React.useEffect(() => {
        if (Master.schedule_now) {
            console.log(Master.schedule_now)
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
                        ? Object.keys(Master.mkrt_unit[scheduleUser.unit_blocks]).map(val => (
                            <>
                                <View style={{width: `${100 / Object.keys(Master.mkrt_unit[scheduleUser.unit_blocks]).length}%`}}>
                                    <View style={[styles.itemContainer, scheduleUser.unit_tower == val ? { backgroundColor: '#1abc9c', opacity: 0.2 } : { backgroundColor: '#1abc9c' }]}>
                                        <Text style={styles.itemName}>{val}</Text>
                                    </View>
                                </View>
                            </>
                        ))
                        : null
                    }

                    {
                        Master.mkrt_unit[scheduleUser.unit_blocks]
                        ? <FlatGrid
                            itemDimension={130}
                            data={Object.keys(listTower)}
                            style={styles.containerContent}
                            spacing={10}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity>
                                    <View style={[styles.itemContainer, indexTower === Object.keys(listTower)[index] ? { backgroundColor: '#1abc9c', opacity: 0.5 } : { backgroundColor: '#1abc9c' }]}>
                                        <Text style={styles.itemName}>{Object.keys(listTower)[index]}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        : null
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