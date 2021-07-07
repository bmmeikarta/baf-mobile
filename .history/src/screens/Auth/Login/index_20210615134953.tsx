import React from "react"
import { StyleSheet, View, SafeAreaView } from "react-native"
import {
    Button,
    Icon,
    Input,
    Text
} from "react-native-elements"

const Login = () => {
    return <SafeAreaView style={styles.container}>
        <View style={styles.isi}>
            <Image source={require('../../../../assets/launcher.png')} style={styles.logo}></Image>
            <Input
                placeholder='Email'
                leftIcon={
                    <Icon
                        name='user'
                        size={24}
                        color='black'
                        type="font-awesome"
                    />
                }
            />
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffb029',
        flexDirection: "column"
    },
    isi: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        alignItems: 'center',
        top: 25
    }
})

export default Login