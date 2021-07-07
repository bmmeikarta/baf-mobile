import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { Text, Header, Icon, Button, Card } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'

const windowWidth = Dimensions.get('window').width;

const BAFReport = () => {
    const Master = useSelector(state => state.Master)
    const dispatch = useDispatch()

    const carouselRef = React.useRef(null)
    const [scheduleUser, setScheduleUser] = React.useState({})

    const BAF = [
        {
            label: 'Bersih',
            image: require('../../../../../assets/cleaning.jpg')
        },
        {
            label: 'Aman',
            image: require('../../../../../assets/secure.jpg')
        },
        {
            label: 'Functional',
            image: require('../../../../../assets/functional.jpg')
        }
    ]

    React.useEffect(() => {
        if (Object.keys(Master.mkrt_unit).length > 0) {
            if (Master.schedule_now) {
                setScheduleUser(Master.schedule_now)
            }
        }
    }, [JSON.stringify(Master.schedule_now)])

    const renderItem = ({ item, index }, parallaxProps: any) => {
        return (
            <View style={styles.item}>
                <View style={styles.imageContainer}>
                    <ParallaxImage
                        source={item.image}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.5}
                        {...parallaxProps}
                    />
                </View>
                 <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.subtitle}>
                        {item.label}
                    </Text>
                 </View>
            </View>
        );
    }

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

                            <View style={[styles.itemContainer, { backgroundColor: 'orange', top: 70 }]}>
                                <Text style={styles.itemName}>Zone {Master.choosedZone}</Text>
                            </View>
                        </ View>
                        : null
                }
            </View>
            <View style={[{ top: 60 }]}>
                <Carousel
                    ref={carouselRef}
                    data={BAF}
                    renderItem={renderItem}
                    sliderWidth={windowWidth}
                    sliderHeight={windowWidth}
                    itemWidth={windowWidth - 60}
                    hasParallaxImages={true}
                    style={styles.slideInnerContainer}
                />
            </View>
        </View>
    )
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const wp = (percentage: number) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const styles = StyleSheet.create({
    slideInnerContainer: {
        width: windowWidth,
        height: windowWidth,
        paddingHorizontal: wp(2),
        paddingBottom: 18 // needed for shadow
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.4)',
        paddingTop: 20 - 8,
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    subtitle: {
        marginTop: 6,
        color: 'grey',
        fontSize: 12,
        fontStyle: 'italic',
        color: 'rgba(255, 0, 0, 0.4)',
    },
    item: {
        width: windowWidth - 60,
        height: windowWidth - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.OS === 'ios' ? 8 : 0, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? 8 : 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
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

export default BAFReport