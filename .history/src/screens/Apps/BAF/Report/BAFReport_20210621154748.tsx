import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { Text, Header, Icon, Button, Card } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import Modal from 'react-native-modalbox';
import moment from 'moment'

const windowWidth = Dimensions.get('window').width;

const BAFReport = () => {
    const Master = useSelector(state => state.Master)
    const Auth = useSelector(state => state.AuthInfo)
    const dispatch = useDispatch()

    const carouselRef = React.useRef(null)
    const [scheduleUser, setScheduleUser] = React.useState({})
    const [reportModal, setReportModal] = React.useState(false)
    const [photoCheck, setPhotoCheck] = React.useState('')

    const BAF = [
        {
            label: 'Bersih',
            image: require('../../../../../assets/cleaning.jpg'),
            oklabel: 'Bersih',
            noklabel: 'Tidak Bersih'
        },
        {
            label: 'Aman',
            image: require('../../../../../assets/secure.jpg'),
            oklabel: 'Aman',
            noklabel: 'Tidak Aman'
        },
        {
            label: 'Functional',
            image: require('../../../../../assets/functional.jpg'),
            oklabel: 'Berfungsi',
            noklabel: 'Tidak Berfungsi'
        }
    ]

    React.useEffect(() => {
        if (Object.keys(Master.mkrt_unit).length > 0) {
            if (Master.schedule_now) {
                setScheduleUser(Master.schedule_now)
            }
        }
    }, [JSON.stringify(Master.schedule_now)])

    const choosedBAF = (data: any, action: any) => {
        if (data.label === 'Bersih') {
            setReportModal(true)
        } else if(data.label === 'Aman') {
            setReportModal(true)
        } else if(data.label === 'Functional') {
            setReportModal(true)
        }
    }

    const submitBAF = (status: any) => {
        let datanya
        if (Master.historyStore && Master.historyStore.length > 0) {
            datanya = [...Master.historyStore, {
                batch: Master.historyStore[Master.historyStore.length - 1].batch + 1,
                hist: [
                ...Master.historyStore[Master.historyStore.length - 1].hist,
                {
                    baf_cat_id : '',
                    baf_photo : '',
                    baf_photo_status : '',
                    baf_id_user : '',
                    baf_status : '',
                    baf_tower : '',
                    baf_blocks : '',
                    baf_floor : '',
                    baf_zone : '',
                    baf_scanned_zone : '',
                    baf_date_trans : ''
                }]
            }]
        } else {
            datanya = [{
                batch: 1,
                hist: [{
                    baf_cat_id : '',
                    baf_photo : status === 'ok' ? '' : photoCheck,
                    baf_photo_status : status,
                    baf_id_user : Auth.username,
                    baf_status : status,
                    baf_tower : scheduleUser.unit_tower,
                    baf_blocks : scheduleUser.unit_blocks,
                    baf_floor : Master.choosedFloor.floor,
                    baf_zone : Master.choosedZone,
                    baf_scanned_zone : Master.scannedZone,
                    baf_date_trans : moment().format('YYYY-MM-DD hh:mm:ss')
                }]
            }]
        }

        console.log(datanya)
        dispatch({ type: 'SET_INSERT_HISTORY', payload: datanya })
    }

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
                <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.subtitle}>
                        {item.label}
                    </Text>
                    <View style={{
                        padding: 5,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        flex: 1,
                    }}>
                        <Button
                            title={item.oklabel}
                            containerStyle={{ width: '50%', paddingRight: 5 }}
                            onPress={() => submitBAF('ok')}
                        />
                        <Button
                            title={item.noklabel}
                            containerStyle={{ width: '50%', paddingLeft: 5 }}
                            buttonStyle={{ backgroundColor: 'red' }}
                            onPress={() => choosedBAF(item, 'nok')}
                        />
                    </View>
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

                            <View style={[styles.itemContainer, { backgroundColor: 'grey', top: 70}]}>
                                <Text style={styles.itemName}>Zone {Master.choosedZone}</Text>
                            </View>
                        </ View>
                        : null
                }
            </View>
            <View style={[{ top: 70 }]}>
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

            <Modal isOpen={reportModal} position={"bottom"} onClosed={() => setReportModal(false)} style={{ height: '90%' }}>
                <View style={styles.container}>
                    <Text>Category disini</Text>
                </View>
            </Modal>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        // width: windowWidth,
        bottom: 0,
        width: '100%'
    },
    subtitle: {
        marginTop: 6,
        color: 'white',
        fontSize: 20,
        backgroundColor: 'transparent',
        fontStyle: 'italic',
        fontWeight: 'bold'
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