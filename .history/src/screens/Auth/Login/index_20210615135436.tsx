import React from "react"
import { StyleSheet, View, SafeAreaView, Image } from "react-native"
import {
    Button,
    Icon,
    Input,
    Text
} from "react-native-elements"

const Login = () => {
    return <SafeAreaView style={styles.container}>
        <View style={styles.isi}>
            <Image source={require('../../../../assets/mkt.png')} style={styles.logo}></Image>
            <View style={styles.input}>
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
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff',
        flexDirection: "column"
    },
    isi: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        alignItems: 'center',
        top: 25,
        padding: 20
    },
    logo: {
        width: 200,
        height: 200
    },
    input: {
        top: 10,
        width: '100%',
        padding: 10
    }
})

export default Login