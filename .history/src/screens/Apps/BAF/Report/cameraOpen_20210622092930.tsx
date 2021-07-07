import React from "react";
import { Camera } from 'expo-camera';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity } from "react-native";
import { Text, Header, Icon, Button, Card } from "react-native-elements";

const CameraOpen = () => {
    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);
    const [torch, setTorch] = React.useState(Camera.Constants.FlashMode.off)
    const cameraRef = React.useRef(null)

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [])

    const snap = async () => {
        if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();

            console.log(photo)
        }
    }

    return <View>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
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
                        name="camera-iris"
                        type='material-community'
                        size={18}
                        color='white'
                    />
                </TouchableOpacity>
            </View>
        </Camera>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        width: '100%',
        height: '80%',
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
        right: '50%',
        bottom: 0
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
})

export default CameraOpen