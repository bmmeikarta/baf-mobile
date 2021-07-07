import React from "react";
import { Camera } from 'expo-camera';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity, ImageBackground } from "react-native";
import { Text, Header, Icon, Button, Slider } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";

const { height, width } = Dimensions.get('window');

const OpenCamera = () => {
    const dispatch = useDispatch()
    const Photo = useSelector(state => state.Photo)

    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);
    const [torch, setTorch] = React.useState(Camera.Constants.FlashMode.off)
    const [isPhoto, setIsPhoto] = React.useState('')
    const [isRatioSet, setIsRatioSet] = React.useState(false);
    const [ratio, setRatio] = React.useState('4:3');  // default is 4:3
    const [imagePadding, setImagePadding] = React.useState(0);
    const [zoom, setZoom] = React.useState(0)

    const cameraRef = React.useRef(null)

    const screenRatio = height / width;

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [])

    React.useEffect(() => {

    }, [
        JSON.stringify(Photo.mode),
        JSON.stringify(Photo.openCamera),
        JSON.stringify(Photo.autoSubmit)
    ])

    const snap = async () => {
        if (cameraRef) {
            let photo = await cameraRef.current.takePictureAsync({
                base64: true
            })
            if (photo) {
                setIsPhoto(`data:image/jpg;base64,${photo.base64}`)
            }
        }
    }

    const prepareRatio = async () => {
        let desiredRatio = '4:3';  // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await cameraRef.current.getSupportedRatiosAsync();

            // Calculate the width/height of each of the supported camera ratios
            // These width/height are measured in landscape mode
            // find the ratio that is closest to the screen ratio without going over
            let distances = {};
            let realRatios = {};
            let minDistance = null;
            for (const ratio of ratios) {
                const parts = ratio.split(':');
                const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
                realRatios[ratio] = realRatio;
                // ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio;
                distances[ratio] = realRatio;
                if (minDistance == null) {
                    minDistance = ratio;
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio;
                    }
                }
            }
            // set the best match
            desiredRatio = minDistance;
            //  calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            );
            // set the preview padding and preview ratio
            setImagePadding(remainder / 2);
            setRatio(desiredRatio);
            // Set a flag so we don't do this 
            // calculation each time the screen refreshes
            setIsRatioSet(true);
        }
    };

    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio();
        }
    };

    const onSubmitPhoto = (data: any) => {
        dispatch({ type: 'SET_CAPTURE_PHOTO', payload: data })
    }

    const onScanBarcode = (data: any) => {
        if (Photo.mode === 'scan') {
            dispatch({ type: 'SET_SCAN_CODE', payload: data.data })
        }
    }

    const renderCamera = () => {
        return <Camera
            ratio={ratio}
            onCameraReady={() => setCameraReady()}
            onBarCodeScanned={onScanBarcode}
            style={[styles.camera, { marginTop: imagePadding, marginBottom: imagePadding }]}
            type={type}
            ref={cameraRef}
        >
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
                {
                    !Photo.autoSubmit
                        ? <TouchableOpacity
                            style={styles.capture}
                            onPress={() => snap()}>
                            <Icon
                                name="camera-iris"
                                type='material-community'
                                size={50}
                                color='white'
                            />
                        </TouchableOpacity>
                        : <View
                            style={{
                                position: 'absolute',
                                top: 20,
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'center'
                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 20
                                }}
                            >Move your camera to QR Code</Text>
                        </View>
                }
                <TouchableOpacity
                    style={styles.torch}
                    onPress={() => {
                        setTorch(
                            torch === Camera.Constants.FlashMode.off
                                ? Camera.Constants.FlashMode.on
                                : Camera.Constants.FlashMode.off
                        );
                    }}>
                    <Icon
                        name={torch ? "flashlight" : "flashlight-off"}
                        type='material-community'
                        size={18}
                        color='white'
                    />
                </TouchableOpacity>
                <View style={styles.zoomer}>
                    <Slider
                        value={zoom}
                        onValueChange={setZoom}
                        maximumValue={100}
                        minimumValue={0}
                        step={1}
                        trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                        thumbProps={{
                            children: (
                                <Icon
                                    name="zoom"
                                    type="fontisto"
                                    size={10}
                                    reverse
                                    containerStyle={{ bottom: 30, right: 20 }}
                                    color="#f50"
                                />
                            ),
                        }}
                    />
                    <Text>Value: {zoom}</Text>
                </View>
            </View>
        </Camera>
    }

    const renderImage = () => {
        return <ImageBackground source={{ uri: isPhoto }} style={styles.camera}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                bottom: 0,
                width: '100%',
                position: 'absolute'
            }}>
                <Button
                    title={'Capture Again'}
                    onPress={() => setIsPhoto('')}
                    containerStyle={{ width: '50%' }}
                    buttonStyle={{ backgroundColor: 'orange' }}
                />
                <Button
                    title={'Submit Photo'}
                    onPress={() => onSubmitPhoto(isPhoto)}
                    containerStyle={{ width: '50%' }}
                />
            </ View>
        </ImageBackground>
    }

    return <View style={{ flex: 1 }}>
        {
            Photo.mode === 'photo'
                ? isPhoto !== ''
                    ? renderImage()
                    : renderCamera()
                : renderCamera()
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    torch: {
        position: 'absolute',
        right: 10,
        bottom: 0
    },
    zoomer: {
        position: 'absolute',
        right: 0,
        bottom: '42%',
        transform: [ { rotate: "-90deg" } ]
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        position: 'absolute',
        left: '42%',
        bottom: 0
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
})

export default OpenCamera