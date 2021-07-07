import React from "react";
import { Header, Icon } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

const HeaderAssign = () => {
    const [scheduleUser, setScheduleUser] = React.useState({})

    return <>
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
                        </View>

                        <View style={[styles.itemContainer, { backgroundColor: 'grey', top: 70 }]}>
                            <Text style={styles.itemName}>Zone {Master.choosedZone}</Text>
                        </View>
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
})

export default HeaderAssign