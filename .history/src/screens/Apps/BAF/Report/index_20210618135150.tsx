import React from 'react'

import { Text } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Header, Icon } from 'react-native-elements'

const Report = () => {
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
                    <Text style={styles.itemName}>Blocks</Text>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    top: 10
                }}>

                    <View style={[styles.itemContainer, { backgroundColor: '#1abc9c', width: '50%' }]}>
                        <Text style={styles.itemName}>Blocks</Text>
                    </View>
                    <View style={[styles.itemContainer, { backgroundColor: '#1abc9c', width: '50%' }]}>
                        <Text style={styles.itemName}>Blocks</Text>
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