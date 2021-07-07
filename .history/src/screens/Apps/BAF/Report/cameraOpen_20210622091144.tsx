import React from "react";
import { Camera } from 'expo-camera';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity } from "react-native";
import { Text, Header, Icon, Button, Card } from "react-native-elements";

const CameraOpen = () => {
    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    },[])
    
    return <View>
        <Camera style={styles.camera} type={type}>
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
                    style={styles.torch}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Icon 
                        name="flashlight"
                        type='material-community'
                        size={18}
                        color='white'
                    />
                </TouchableOpacity>
            </View>
        </Camera>
        <Button
            title='Capture'
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    torch: {
        position: 'absolute',
        right: 100
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
})

export default CameraOpen