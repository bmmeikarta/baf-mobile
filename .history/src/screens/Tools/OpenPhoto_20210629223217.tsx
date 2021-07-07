import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Platform } from 'react-native'
import { CheckBox, Button, Icon } from 'react-native-elements';
import Lightbox from 'react-native-lightbox';
import { FlatGrid } from 'react-native-super-grid'
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modalbox';

import OpenCamera from './OpenCamera';
import { Actions } from 'react-native-router-flux';

const OpenPhoto = () => {
    const dispatch = useDispatch()
    const Photo = useSelector(state => state.Photo)

    const [isDeleteMode, setIsDeleteMode] = React.useState(false)
    const [photoCheck, setPhotoCheck] = React.useState([])
    const [scanCheck, setScanCheck] = React.useState([])
    const [selectPhoto, setSelectPhoto] = React.useState([])
    const [photoModal, setPhotoModal] = React.useState(false)
    const [photoListMode, setPhotoListMode] = React.useState('')

    const deletePhoto = () => {
        const data = photoCheck.filter((val, index) => !selectPhoto.includes(index))

        setPhotoCheck(data)
        setSelectPhoto([])
        setIsDeleteMode(false)
    }

    React.useEffect(() => {
        if (Photo.photoList && Photo.photoList.length > 0) {
            setPhotoCheck(Photo.photoList)
        }

        if (Photo.photoListMode !== '') {
            setPhotoListMode(Photo.photoListMode)
        }
    }, [
        JSON.stringify(Photo.photoList),
        Photo.photoListMode
    ])

    React.useEffect(() => {
        if (Photo.photoCapture) {
            const photonya: any = [
                ...photoCheck,
                Photo.photoCapture
            ]

            setPhotoCheck(photonya)
            setPhotoModal(false)
            dispatch({ type: 'SET_CAPTURE_PHOTO', payload: '' })
        }
    }, [JSON.stringify(Photo.photoCapture)])

    React.useEffect(() => {
        if (Photo.scanCapture) {
            const scannya: any = [
                ...scanCheck,
                ...[Photo.scanCapture]
            ]

            console.log(scannya)

            setPhotoCheck(scannya)
            setPhotoModal(false)
            dispatch({ type: 'SET_SCAN_CODE', payload: '' })
        }
    },[Photo.scanCapture])

    const onSubmitPhoto = () => {
        dispatch({ type: 'SET_LIST_PHOTO', payload: photoCheck })
        dispatch({
            type: 'SET_OPEN_PHOTO', payload: {
                mode: Photo.mode,
                openCamera: false
            }
        })
        Actions.pop()
    }

    return <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Modal Take Photo */}
        <Modal
            isOpen={photoModal}
            position={"bottom"}
            onClosed={() => setPhotoModal(false)}
            style={{ height: '100%' }}>
            <View style={{ flex: 1 }}>
                {
                    photoModal
                        ? <OpenCamera />
                        : null
                }
            </View>
        </Modal>
        <ScrollView style={{ height: '70%', paddingTop: 30 }}>
            <View style={styles.containerContent}>
                {photoCheck.length > 0
                    ? <FlatGrid
                        itemDimension={Photo.mode === 'photo' ? 100 : 130}
                        data={photoCheck}
                        spacing={3}
                        renderItem={({ item, index }) => (
                            <View style={styles.imageContainer}>
                                <TouchableOpacity
                                    style={{ flex: 1, backgroundColor: isDeleteMode ? 'white' : 'white' }}>
                                    <Lightbox
                                        navigator={null}
                                        style={Photo.mode === 'photo' ? styles.itemContainerListPhoto : styles.itemContainerListScan}
                                        onLongPress={() => setIsDeleteMode(true)}
                                    >
                                        {
                                            Photo.mode === 'photo'
                                            ? <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} />
                                            : <View style={{ 
                                                width: '100%',
                                                height: '100%',
                                                alignContent: 'center',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'cyan'
                                            }} >
                                                <Text style={{
                                                    fontWeight: 'bold'
                                                }}>
                                                    {item}
                                                </Text>
                                            </View>
                                        }
                                        
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
                    : <View style={{
                        flex: 1,
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10
                    }}>
                        {
                            Photo.mode === 'photo'
                                ? <Icon
                                    reverse
                                    name='image-off'
                                    type='material-community'
                                    color='#517fa4'
                                    size={50}
                                />
                                : <Icon
                                    reverse
                                    name='qr-code-scanner'
                                    color='#517fa4'
                                    size={50}
                                />
                        }

                        <Text>No {Photo.mode} added</Text>
                    </View>
                }
            </View>
        </ScrollView>

        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            width: '100%',
            paddingBottom: 5
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
        {
            photoListMode === 'create'
                ? <>
                    <View style={{
                        paddingBottom: 5
                    }}>
                        <Button
                            title={`Add ${Photo.mode}`}
                            onPress={() => setPhotoModal(true)}
                        ></Button>
                    </View>
                    <View>
                        <Button
                            title={`Submit ${Photo.mode}`}
                            buttonStyle={{ backgroundColor: 'green' }}
                            onPress={() => onSubmitPhoto()}
                            disabled={photoCheck.length === 0}
                        ></Button>
                    </View>
                </>
                : <Text>{Photo.photoListMode}</Text>
        }
    </View>
}

const styles = StyleSheet.create({
    containerContent: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.OS === 'ios' ? 8 : 0, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    itemContainerListPhoto: {
        justifyContent: 'center',
        borderRadius: 15,
        width: 120,
        height: 120,
    },
    itemContainerListScan: {
        justifyContent: 'center',
        borderRadius: 15,
        width: 170,
        height: 120,
    },
})

export default OpenPhoto