import React from "react";
import { Button, Badge, Icon } from "react-native-elements";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    Alert
} from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";
import moment from 'moment'

import HeaderAssign from "./Header";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BAFChoose = () => {
    const dispatch = useDispatch()
    const Auth = useSelector(state => state.AuthInfo)
    const Master = useSelector(state => state.Master)
    const Photo = useSelector(state => state.Photo)

    const carouselRef = React.useRef(null)
    const [BAFList, setBAFList] = React.useState([])
    const [choosedIndex, setChoosedIndex] = React.useState('')
    const [refreshKey, setRefreshKey] = React.useState(0)

    React.useEffect(() => {
        if (Master.categoryList.length > 0) {
            let catBAF = []
            Master.categoryList.map(val => {
                catBAF.push({
                    ...val,
                    photoList: [],
                    label: val.baf_cat_name,
                    image: val.baf_cat_name === 'Kebersihan'
                        ? require('../../../../../assets/cleaning.jpg')
                        : val.baf_cat_name === 'Keamanan'
                            ? require('../../../../../assets/secure.jpg')
                            : require('../../../../../assets/functional.jpg'),
                    oklabel: val.baf_cat_name === 'Kebersihan'
                        ? 'Bersih'
                        : val.baf_cat_name === 'Keamanan'
                            ? 'Aman'
                            : 'Fungsional',
                    noklabel: val.baf_cat_name === 'Kebersihan'
                        ? 'Tidak Bersih'
                        : val.baf_cat_name === 'Keamanan'
                            ? 'Tidak Aman'
                            : 'Tidak Berfungsi'
                })
            })

            setBAFList(catBAF)
            setRefreshKey(refreshKey + 1)
        }
    }, [
        JSON.stringify(Master.categoryList)
    ])

    React.useEffect(() => {
        // Jika dari list photo langsung
        if (Photo.photoList.length > 0) {
            // console.log('ambil dari photo langsung')
            // console.log(Photo.photoList.length)
            if (choosedIndex !== '') {
                const sourcenya = BAFList
                const dataPhoto = []
                Photo.photoList.map(val => {
                    dataPhoto.push({
                        id: sourcenya[choosedIndex].id,
                        photo: val,
                        status: sourcenya[choosedIndex].statusLabel
                    })
                })

                sourcenya[choosedIndex].photoList = dataPhoto
                setBAFList(sourcenya)
                setRefreshKey(refreshKey + 1)
            }
        }
    }, [JSON.stringify(Photo.photoList)])

    React.useEffect(() => {
        // Jika dari pilih kategori
        if (Master.storedPhotoList && Master.storedPhotoList.length > 0) {
            if (choosedIndex !== '') {
                const sourcenya = BAFList
                sourcenya[choosedIndex] = {
                    ...BAFList[choosedIndex],
                    photoList: Master.storedPhotoList
                }

                setBAFList(sourcenya)
                setRefreshKey(refreshKey + 1)
                setChoosedIndex('')

                // dispatch({ type: 'SET_STORE_PHOTO_LIST', payload: [] })
            }
        }
    }, [JSON.stringify(Master.storedPhotoList)])

    const choosedBAF = (data: any, idx: any) => {
        dispatch({ type: 'SET_STORE_PHOTO_LIST', payload: [] })

        const sourcenya = BAFList
        sourcenya[idx] = {
            ...BAFList[idx],
            statusLabel: data.statusLabel,
            baf_blocks: Master.schedule_now.unit_blocks,
            baf_tower: Master.schedule_now.unit_tower,
            baf_floor: Master.choosedFloor.floor,
            baf_zone: Master.choosedZone
        }

        setBAFList(sourcenya)
        setRefreshKey(refreshKey + 1)

        if (data.statusLabel === 'ok') {
            sourcenya[idx].photoList = [
                ...BAFList[idx].photoList,
                {
                    id: data.id,
                    photo: '',
                    status: data.statusLabel
                }]
        } else {
            if (data.baf_is_input) {
                dispatch({
                    type: 'SET_OPEN_PHOTO', payload: {
                        mode: 'photo',
                        openCamera: true,
                        autoSubmit: false
                    }
                })
                dispatch({ type: 'SET_PHOTO_LIST_MODE', payload: 'create' })
                dispatch({ type: 'SET_LIST_PHOTO', payload: [] })
                Actions.openPhoto()
            } else {
                // console.log(data.child)
                Actions.viewCat({ dataCat: data.child, dataPhoto: [] })
                console.log('bla')
            }
        }

        setBAFList(sourcenya)
        setChoosedIndex(idx)
        setRefreshKey(refreshKey + 1)
    }

    const removeBAF = (idx: any) => {
        Alert.alert(
            "Cancel Data",
            "Apakah anda ingin membatalkan ini ?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Batalkan",
                    onPress: () => {
                        const sourcenya = BAFList
                        sourcenya[idx].photoList = []
                        setBAFList(sourcenya)
                        setRefreshKey(refreshKey + 1)
                    }
                }
            ]
        )
    }

    const viewBAF = (idx: any) => {
        const checkPhoto = BAFList[idx].photoList.filter(val => val.photo !== '')
        if (checkPhoto.length > 0) {
            if (BAFList[idx].baf_is_input) {
                const parsedImage = BAFList[idx].photoList.map(val => val.photo !== '' ? val.photo : null)
                dispatch({ type: 'SET_LIST_PHOTO', payload: parsedImage })
                dispatch({ type: 'SET_PHOTO_LIST_MODE', payload: 'view' })
                Actions.openPhoto()
            } else {
                // console.log(BAFList[idx].child)
                Actions.viewCat({ dataCat: BAFList[idx].child, dataPhoto: BAFList[idx].photoList })
            }
        }
    }

    const submitReport = () => {
        // console.log(BAFList)
        Alert.alert(
            "Submit Data",
            "Apakah anda ingin submit report ini ?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Submit",
                    onPress: () => {
                        console.log(BAFList)
                        const dataParse: any = []
                        BAFList.map(val => {
                            if (val.photoList.length > 0) {
                                const data = {
                                    baf_root_id: val.id,
                                    baf_floor: Master.choosedFloor.floor,
                                    baf_zone: Master.choosedZone,
                                    baf_scanned_zone: Master.scannedZone,
                                    baf_date_trans: moment().format('YYYY-MM-DD hh:mm:ss'),
                                    baf_status: val.statusLabel,
                                    child: val.photoList
                                }
                                
                                dataParse.push(data)
                            }
                        })
                        
                        dispatch({ type: 'SET_DETAIL_HISTORY', payload: {
                            baf_tower: Master.schedule_now.unit_tower,
                            baf_blocks: Master.schedule_now.unit_blocks,
                            baf_batch_schedule: Master.schedule_now.batch_schedule,
                            data: dataParse
                        }})

                        Actions.pop()
                    }
                }
            ]
        )
    }

    const renderItem = ({ item, index }, parallaxProps: any) => {
        return (
            <View key={refreshKey} style={styles.item}>
                <View style={styles.imageContainer}>
                    <ParallaxImage
                        source={item.image}
                        containerStyle={styles.imageContainer}
                        parallaxFactor={0.3}
                        {...parallaxProps}
                    />
                </View>
                <View style={[styles.textContainer, { height: item.photoList.length > 0 ? '100%' : '30%' }]}>
                    <Text numberOfLines={2} style={styles.subtitle}>
                        {item.label}
                    </Text>
                    {
                        item.photoList.length > 0
                            ? <View style={{ alignSelf: 'center' }}>
                                <Badge status="success" value={item.photoList.length} textStyle={{ fontSize: 15 }} />
                                {
                                    item.statusLabel === 'ok'
                                        ? <Icon
                                            raised
                                            name='check'
                                            type='font-awesome'
                                            size={50}
                                            color="green" />
                                        : <Icon
                                            raised
                                            name='exclamation'
                                            type='font-awesome'
                                            size={50}
                                            color="red" />
                                }
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
                            {
                                item.photoList.length > 0
                                    ? <>
                                        <Button
                                            title={'Cancel'}
                                            buttonStyle={{ backgroundColor: 'red' }}
                                            containerStyle={{ width: '50%', paddingRight: 5 }}
                                            onPress={() => removeBAF(index)}
                                        />
                                        <Button
                                            title={'View'}
                                            disabled={item.statusLabel === 'ok'}
                                            buttonStyle={{ backgroundColor: 'orange' }}
                                            containerStyle={{ width: '50%', paddingRight: 5 }}
                                            onPress={() => viewBAF(index)}
                                        />
                                    </>
                                    : <>
                                        <Button
                                            title={item.oklabel}
                                            containerStyle={{ width: '50%', paddingRight: 5 }}
                                            onPress={() => choosedBAF({ ...item, statusLabel: 'ok' }, index)}
                                        />
                                        <Button
                                            title={item.noklabel}
                                            containerStyle={{ width: '50%', paddingLeft: 5 }}
                                            buttonStyle={{ backgroundColor: 'red' }}
                                            onPress={() => choosedBAF({ ...item, statusLabel: 'nok' }, index)}
                                        />
                                    </>
                            }
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return <View style={styles.container}>
        <HeaderAssign
            title={'Update BAF'}
            zone={Master.choosedZone ? true : false}
            tower={false}
        />

        <View style={styles.contentCon}>
            <Carousel
                ref={carouselRef}
                data={BAFList}
                renderItem={renderItem}
                sliderWidth={windowWidth}
                sliderHeight={windowHeight}
                itemWidth={windowWidth - 60}
                itemHeight={windowHeight - 200}
                hasParallaxImages={true}
                vertical={true}
            />
        </View>

        <Button
            title="Submit Report"
            disabled={BAFList.filter(val => val.photoList.length === 0).length > 0}
            onPress={() => submitReport()}
        ></Button>
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
    contentCon: {
        top: 50,
        flex: 1,
        paddingHorizontal: 10,
        height: windowHeight
    },
    item: {
        width: windowWidth - 20,
        height: windowWidth - 60
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
        top: 10,
        left: 10,
        color: 'white',
        fontSize: 20,
        backgroundColor: 'transparent',
        fontStyle: 'italic',
        fontWeight: 'bold',
        position: 'absolute'
    },
})

export default BAFChoose