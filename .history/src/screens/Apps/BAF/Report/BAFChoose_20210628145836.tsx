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

        if (Photo.photoList.length > 0) {
            if (choosedIndex !== '') {
                const sourcenya = BAFList
                sourcenya[choosedIndex].photoList = Photo.photoList
                setBAFList(sourcenya)
                setRefreshKey(refreshKey + 1)
            }
        }

        if (Master.storedPhotoList && Master.storedPhotoList.length > 0) {
            if (choosedIndex !== '') {
                const sourcenya = BAFList
                sourcenya[choosedIndex].photoList = Master.storedPhotoList
                setBAFList(sourcenya)
                setRefreshKey(refreshKey + 1)

                dispatch({ type: 'SET_OPEN_PHOTO', payload: [] })
            }
        }
    }, [
        JSON.stringify(Master.categoryList),
        JSON.stringify(Photo.photoList),
        JSON.stringify(Master.storedPhotoList)
    ])

    const choosedBAF = (data: any, idx: any) => {
        const sourcenya = BAFList
        sourcenya[idx].statusLabel = data.statusLabel
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
                Actions.openPhoto()
            } else {
                Actions.viewCat({ dataCat: data.child })
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

    const renderItem = ({ item, index }, parallaxProps: any) => {
        return (
            <View key={refreshKey} style={styles.item}>
                <View style={styles.imageContainer}>
                    <ParallaxImage
                        source={item.image}
                        containerStyle={styles.imageContainer}
                        parallaxFactor={0.5}
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
                                            buttonStyle={{ backgroundColor: 'orange' }}
                                            containerStyle={{ width: '50%', paddingRight: 5 }}
                                            onPress={() => removeBAF(index)}
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
            zone={true}
            tower={false}
        />

        <View style={styles.contentCon}>
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
            

        <Button
            title="Submit Report"
        ></Button>
        </View>
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
        top: 70,
        height: '100%'
    },
    item: {
        width: windowWidth - 60,
        height: windowWidth - 60,
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