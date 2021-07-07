import React from "react";
import { Camera } from 'expo-camera';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity, Image } from "react-native";
import { Text, Header, Icon, Button, Card } from "react-native-elements";
import { useDispatch } from "react-redux";

const { height, width } = Dimensions.get('window');

const CameraOpen = () => {
    const dispatch = useDispatch()

    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);
    const [torch, setTorch] = React.useState(Camera.Constants.FlashMode.off)
    const [isPhoto, setIsPhoto] = React.useState('')
    const [isRatioSet, setIsRatioSet] = React.useState(false);
    const [ratio, setRatio] = React.useState('4:3');  // default is 4:3
    const [imagePadding, setImagePadding] = React.useState(0);

    const cameraRef = React.useRef(null)
    
    const screenRatio = height / width;
    
    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [])

    const snap = async () => {
        if (cameraRef) {
            let photo = await cameraRef.current.takePictureAsync()
            if (photo) {
                setIsPhoto(photo.uri)
                dispatch({ type: 'SET_PHOTO_CAPTURE', payload: photo.uri })
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

    return <View>
        {
            isPhoto !== ''
                ? <Image source={{ uri: isPhoto }} style={styles.camera}></Image>
                : <Camera ratio={ratio} onCameraReady={() => setCameraReady()} style={[styles.camera, {marginTop: imagePadding, marginBottom: imagePadding}]} type={type} ref={cameraRef}>
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
                        <TouchableOpacity
                            style={styles.capture}
                            onPress={() => snap()}>
                            <Icon
                                name="camera-iris"
                                type='material-community'
                                size={25}
                                color='white'
                            />
                        </TouchableOpacity>
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
                    </View>
                </Camera>
        }

        {
            isPhoto
                ? <Button
                    title={'Capture Again'}
                    onPress={() => setIsPhoto('')}
                />
                : null
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        width: '100%',
        height: '90%',
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
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        position: 'absolute',
        right: '45%',
        bottom: 0
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
})

export default CameraOpen