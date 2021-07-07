import React from "react";
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { Text, Header, Icon, Button, CheckBox, ListItem } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import Modal from 'react-native-modalbox';
import moment from 'moment'
import { FlatGrid } from "react-native-super-grid";
import Lightbox from 'react-native-lightbox';

import CameraOpen from "./cameraOpen";
import ListCategory from "./listCategory";

const windowWidth = Dimensions.get('window').width;

const BAFReport = () => {
    const dispatch = useDispatch()

    const Master = useSelector(state => state.Master)
    const Auth = useSelector(state => state.AuthInfo)

    const carouselRef = React.useRef(null)
    const [scheduleUser, setScheduleUser] = React.useState({})

    const [photoModal, setPhotoModal] = React.useState(false)
    const [chooseCatModal, setChooseCatModal] = React.useState(false)

    const [photoCheck, setPhotoCheck] = React.useState([])
    const [okCheck, setOkCheck] = React.useState('')
    const [tempStore, setTempStore] = React.useState([])
    const [BAFList, setBAFList] = React.useState([])
    const [choosedBAFTemp, setChoosedBAFTemp] = React.useState({})
    const [selectPhoto, setSelectPhoto] = React.useState([])
    const [isDeleteMode, setIsDeleteMode] = React.useState(false)

    const [choosedCategory, setChoosedCategory] = React.useState([])

    React.useEffect(() => {
        if (Object.keys(Master.mkrt_unit).length > 0) {
            if (Master.schedule_now) {
                setScheduleUser(Master.schedule_now)
            }
        }

        if (Master.categoryList.length > 0) {
            let catBAF = []
            Master.categoryList.map(val => {
                catBAF.push({
                    ...val,
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
        }

        if (Master.photoCapture) {
            const photonya: any = [
                ...photoCheck,
                Master.photoCapture
            ]

            setPhotoCheck(photonya)
            setPhotoModal(false)
        }
    }, [
        JSON.stringify(Master.schedule_now),
        JSON.stringify(Master.categoryList),
        JSON.stringify(Master.photoCapture)
    ])

    const choosedBAF = (data: any, action: any) => {
        dispatch({ type: 'SET_PHOTO_CAPTURE', payload: '' })
        setChoosedBAFTemp({
            ...data,
            choosedStat: action
        })
        if (action === 'ok') {
            submitBAF(data, action)
        } else {
            console.log(data.baf_is_input)
            if (data.baf_is_input) {
                setReportModal(true)
            } else {
                if (data.child.length > 0) {
                    setChoosedCategory(data)
                    setChooseCatModal(true)
                }
            }
        }
    }

    const submitBAF = (data: any, status: any) => {
        let datanya = [{
            baf_cat_id: data.id,
            baf_photo: status === 'ok' ? '' : data.photo,
            baf_photo_status: status,
            baf_id_user: Auth.username,
            baf_status: status,
            baf_tower: scheduleUser.unit_tower,
            baf_blocks: scheduleUser.unit_blocks,
            baf_floor: Master.choosedFloor.floor,
            baf_zone: Master.choosedZone,
            baf_scanned_zone: Master.scannedZone,
            baf_date_trans: moment().format('YYYY-MM-DD hh:mm:ss')
        }]

        if (tempStore.length > 0) {
            Alert.alert(
                "Change Status",
                "Apakah anda ingin mengganti status ini ? Data - data foto yang tersimpan akan di hapus !",
                [
                    {
                        text: "Cancel",
                        onPress: () => { },
                        style: "cancel",
                    },
                    {
                        text: "Submit",
                        onPress: () => {
                            const temp = tempStore.filter(obj1 => !datanya.some(obj2 =>
                                obj1.baf_cat_id === obj2.baf_cat_id &&
                                obj1.baf_id_user === obj2.baf_id_user &&
                                obj1.baf_tower === obj2.baf_tower &&
                                obj1.baf_blocks === obj2.baf_blocks &&
                                obj1.baf_floor === obj2.baf_floor &&
                                obj1.baf_zone === obj2.baf_zone &&
                                obj1.baf_scanned_zone === obj2.baf_scanned_zone
                            ))

                            const arr1 = [...temp, ...datanya]
                            setTempStore(arr1)
                        }
                    }
                ]
            )
        } else {
            setTempStore(datanya)
        }
        // dispatch({ type: 'SET_INSERT_HISTORY', payload: datanya })
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
                            onPress={() => choosedBAF(item, 'ok')}
                            disabled={tempStore.filter(val => val.baf_cat_id === item.id && val.baf_status === 'ok').length > 0}
                        />
                        <Button
                            title={item.noklabel}
                            containerStyle={{ width: '50%', paddingLeft: 5 }}
                            buttonStyle={{ backgroundColor: 'red' }}
                            onPress={() => choosedBAF(item, 'nok')}
                            disabled={tempStore.filter(val => val.baf_cat_id === item.id && val.baf_status === 'nok').length > 0}
                        />
                    </View>
                </View>
            </View>
        );
    }

    const deletePhoto = () => {
        const data = photoCheck.filter((val, index) => !selectPhoto.includes(index))

        setPhotoCheck(data)
        setSelectPhoto([])
        setIsDeleteMode(false)
    }

    const setReportModal = (statenya: any) => {
        dispatch({ type: 'SET_PHOTO_GROUP_MODAL', payload: statenya })
    }

    const onSubmitPhoto = () => {
        Alert.alert(
            "Submit Photo",
            "Apakah anda ingin submit photo ini",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Submit",
                    onPress: () => {
                        photoCheck.map(val => {
                            submitBAF({
                                ...choosedBAFTemp,
                                photo: val
                            }, choosedBAFTemp.choosedStat)

                            setReportModal(false)
                        })
                    },
                },
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                        "This alert was dismissed by tapping outside of the alert dialog."
                    ),
            }
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

                            <View style={[styles.itemContainer, { backgroundColor: 'grey', top: 70 }]}>
                                <Text style={styles.itemName}>Zone {Master.choosedZone}</Text>
                            </View>
                        </ View>
                        : null
                }
            </View>
            <View style={[{ top: 75, flex: 1 }]}>
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

            {/* Modal Choose Photo */}
            <Modal
                isOpen={Master.photoGroupModal}
                position={"bottom"}
                onClosed={() => setReportModal(false)}
                style={{ height: '100%' }}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={{ height: '80%' }}>
                        {
                            Master.photoGroupModal
                                ? choosedBAFTemp.baf_is_input
                                    ? <>
                                        <View style={styles.containerContent}>
                                            {photoCheck.length > 0
                                                ? <FlatGrid
                                                    itemDimension={100}
                                                    data={photoCheck}
                                                    spacing={3}
                                                    renderItem={({ item, index }) => (
                                                        <View style={styles.imageContainer}>
                                                            <TouchableOpacity
                                                                style={{ flex: 1, backgroundColor: isDeleteMode ? 'white' : 'white' }}>
                                                                <Lightbox
                                                                    navigator={null}
                                                                    style={styles.itemContainerListPhoto}
                                                                    onLongPress={() => setIsDeleteMode(true)}
                                                                >
                                                                    <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} />
                                                                </Lightbox>
                                                                {
                                                                    isDeleteMode
                                                                        ? <CheckBox
                                                                            center
                                                                            style={{ position: 'absolute', left: 0, top: 0 }}
                                                                            onPress={() => selectPhoto.filter(val => val === index).length > 0
                                                                                ? setSelectPhoto(selectPhoto.filter(val => val !== index))
                                                                                : setSelectPhoto([...selectPhoto, index])}
                                                                            checked={selectPhoto.filter(val => val === index).length > 0}
                                                                        />
                                                                        : null
                                                                }
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                />
                                                : <Text>No photo added</Text>
                                            }
                                        </View>
                                    </>
                                    : null
                                : null
                        }
                    </ScrollView>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        width: '100%',
                        bottom: 15
                    }}>
                        {
                            isDeleteMode
                                ? <>
                                    <Button
                                        title={'Cancel Delete'}
                                        onPress={() => setIsDeleteMode(false)}
                                        containerStyle={{ width: '50%' }}
                                        buttonStyle={{ backgroundColor: 'green' }}
                                    ></Button>
                                    <Button
                                        title={'Delete Photo'}
                                        onPress={() => deletePhoto()}
                                        containerStyle={{ width: '50%' }}
                                        buttonStyle={{ backgroundColor: 'red' }}
                                    ></Button>
                                </>
                                : null
                        }
                    </View>
                    <View style={{
                        paddingBottom: 5
                    }}>
                        <Button
                            title={'Add Photo'}
                            onPress={() => setPhotoModal(true)}
                        ></Button>
                    </View>
                    <View>
                        <Button
                            title={'Submit Photo'}
                            buttonStyle={{ backgroundColor: 'green' }}
                            onPress={() => onSubmitPhoto()}
                            disabled={photoCheck.length === 0}
                        ></Button>
                    </View>
                </View>
            </Modal>

            {/* Modal Choose Category */}
            <Modal
                isOpen={chooseCatModal}
                position={"bottom"}
                onClosed={() => setChooseCatModal(false)}
                style={{ height: '100%' }}
            >
                <ScrollView style={{height: '80%', top: 30, padding: 10}}>
                {
                    chooseCatModal && choosedCategory.child.length > 0
                        ? choosedCategory.child.map(val => 
                            <ListCategory dataCat={val}/>
                        )
                        : null
                }
                </ScrollView>
            </Modal>

            {/* Modal Take Photo */}
            <Modal
                isOpen={photoModal}
                position={"bottom"}
                onClosed={() => setPhotoModal(false)}
                style={{ height: '100%' }}>
                {
                    photoModal
                        ? <CameraOpen />
                        : null
                }
            </Modal>

            <View style={[{ bottom: 1 }]}>
                <Button
                    title="Submit Report"
                    disabled={tempStore.length === 0}
                    onPress={() => console.log(tempStore)}
                ></Button>
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
    modalContainer: {
        flex: 1,
        top: 30,
        padding: 10,
        paddingBottom: 50
    },
    camera: {
        width: '100%',
        height: '70%',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
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
        backgroundColor: 'cyan',
        justifyContent: 'center',
        borderRadius: 15,
        padding: 10,
        width: 100,
        height: 100,
    },
    itemContainerListPhoto: {
        justifyContent: 'center',
        borderRadius: 15,
        width: 120,
        height: 120,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        alignContent: 'center',
        textAlign: 'center'
    },
    itemNameDark: {
        fontSize: 16,
        color: '#000',
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