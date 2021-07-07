import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Platform } from 'react-native'
import { CheckBox, Button } from 'react-native-elements';
import Lightbox from 'react-native-lightbox';
import { FlatGrid } from 'react-native-super-grid'
import { useSelector } from 'react-redux';
import Modal from 'react-native-modalbox';

import OpenCamera from './OpenCamera';

const OpenPhoto = () => {
    const Photo = useSelector(state => state.Photo)

    const [isDeleteMode, setIsDeleteMode] = React.useState(false)
    const [photoCheck, setPhotoCheck] = React.useState([])
    const [selectPhoto, setSelectPhoto] = React.useState([])
    const [photoModal, setPhotoModal] = React.useState(false)

    const deletePhoto = () => {
        const data = photoCheck.filter((val, index) => !selectPhoto.includes(index))

        setPhotoCheck(data)
        setSelectPhoto([])
        setIsDeleteMode(false)
    }

    React.useEffect(() => {
        if (Photo.photoCapture) {
            const photonya: any = [
                ...photoCheck,
                Photo.photoCapture
            ]

            setPhotoCheck(photonya)
            setPhotoModal(false)
        }
    }, [JSON.stringify(Photo.photoCapture)])

    return <View style={{ flex: 1, top: 30, padding: 10 }}>
        <ScrollView style={{ height: '80%' }}>
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
        <View style={{
            paddingBottom: 5
        }}>
            <Button
                title={'Add Photo'}
                onPress={() => setPhotoModal(true)}
            ></Button>
        </View>
        <View style={{
            paddingBottom: 30
        }}>
            <Button
                title={'Submit Photo'}
                buttonStyle={{ backgroundColor: 'green' }}
                onPress={() => onSubmitPhoto()}
                disabled={photoCheck.length === 0}
            ></Button>
        </View>

        {/* Modal Take Photo */}
        <Modal
            isOpen={photoModal}
            position={"bottom"}
            onClosed={() => setPhotoModal(false)}
            style={{ height: '100%' }}>
            {
                photoModal
                    ? <OpenCamera />
                    : null
            }
        </Modal>
    </View>
}

const styles = StyleSheet.create({
    containerContent: {
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
})

export default OpenPhoto