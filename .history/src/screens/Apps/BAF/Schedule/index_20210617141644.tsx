import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Icon, ListItem, Badge } from 'react-native-elements'

import { useDispatch, useSelector } from "react-redux"

const Schedule = () => {
    return (
        <View style={styles.container}>
            <View style={{ padding: 10 }}>
                <Carousel
                    ref={carouselRef}
                    data={Object.keys(listTower)}
                    renderItem={renderItem}
                    sliderWidth={windowWidth}
                    itemWidth={200}
                    onSnapToItem={(id: string | number) => setListFloor(listTower[Object.keys(listTower)[id]])}
                />
            </View>
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