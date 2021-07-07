import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Icon, ListItem, Badge } from 'react-native-elements'

import { useDispatch, useSelector } from "react-redux"

const Schedule = () => {
    return (
        <View style={styles.container}>
            <Text>Halo ini schedule</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffb029',
        // backgroundColor: '#fff'
    },
})

export default Schedule