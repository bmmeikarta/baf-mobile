import React from "react";
import { Header } from "react-native-elements";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'

import HeaderAssign from "./Header";

const windowWidth = Dimensions.get('window').width;

const BAFChoose = () => {
    const carouselRef = React.useRef(null)
    const [BAFList, setBAFList] = React.useState([])

    const renderItem = ({ item, index }, parallaxProps: any) => {
        return (
            <View style={styles.item}>
                <View style={styles.imageContainer}>
                    <ParallaxImage
                        source={item.image}
                        containerStyle={styles.imageContainer}
                        parallaxFactor={0.5}
                        {...parallaxProps}
                    />
                </View>
                <View style={[styles.textContainer, choosedBAFTemp.includes(item.id) ? { height: '100%' } : { height: '30%' }]}>
                    <Text numberOfLines={2} style={styles.subtitle}>
                        {item.label}
                    </Text>
                    {
                        choosedBAFTemp.includes(item.id)
                            ? <View style={{ alignSelf: 'center' }}>
                                <Badge status="success" />
                                <Icon
                                    raised
                                    name='check'
                                    type='font-awesome'
                                    size={50}
                                    color="green" />
                                <Button
                                    title={'Cancel'}
                                    buttonStyle={{ backgroundColor: 'red' }}
                                    onPress={() => removeBAF(item)}
                                />
                            </View>
                            : null
                    }
                    <View style={{
                        position: 'absolute',
                        bottom: 10,
                        alignSelf: 'center'
                    }}>
                        <View style={{
                            padding: 5,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            flex: 1,
                        }}>
                            <Button
                                title={item.oklabel}
                                containerStyle={{ width: '50%', paddingRight: 5 }}
                                onPress={() => choosedBAF({ ...item, statusLabel: 'ok' })}
                                disabled={choosedBAFTemp.includes(item.id)}
                            />
                            <Button
                                title={item.noklabel}
                                containerStyle={{ width: '50%', paddingLeft: 5 }}
                                buttonStyle={{ backgroundColor: 'red' }}
                                onPress={() => choosedBAF({ ...item, statusLabel: 'nok' })}
                                disabled={choosedBAFTemp.includes(item.id)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    
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

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const wp = (percentage: number) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff'
    },
    slideInnerContainer: {
        width: windowWidth,
        height: windowWidth,
        paddingHorizontal: wp(2),
        paddingBottom: 18 // needed for shadow
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.OS === 'ios' ? 8 : 0, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
})

export default BAFChoose