import React from "react";
import { Header } from "react-native-elements";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'

import HeaderAssign from "./Header";

const windowWidth = Dimensions.get('window').width;

const BAFChoose = () => {
    const carouselRef = React.useRef(null)
    const [BAFList, setBAFList] = React.useState([])
    
    return <View style={styles.container}>
        <HeaderAssign
            title={'Update BAF'}
            zone={true}
            tower={false}
        />

        <Carousel
            ref={carouselRef}
            data={BAFList}
            renderItem={renderItem}
            sliderWidth={windowWidth}
            sliderHeight={windowWidth}
            itemWidth={windowWidth - 60}
            hasParallaxImages={true}
            style={styles.slideInnerContainer}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff'
    },
})

export default BAFChoose