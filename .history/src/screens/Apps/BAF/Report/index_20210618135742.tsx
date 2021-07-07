import React from 'react'

import { Text } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Header, Icon } from 'react-native-elements'

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
                    <Text style={styles.itemName}>{JSON.stringify(scheduleUser)}</Text>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    top: 10
                }}>
                    <View style={{width: '50%', paddingRight: 5}}>
                        <View style={[styles.itemContainer, { backgroundColor: '#1abc9c' }]}>
                            <Text style={styles.itemName}>Tower</Text>
                        </View>
                    </View>
                    
                    <View style={{width: '50%', paddingLeft: 5}}>
                        <View style={[styles.itemContainer, { backgroundColor: '#1abc9c' }]}>
                            <Text style={styles.itemName}>Floor</Text>
                        </View>
                    </View>
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