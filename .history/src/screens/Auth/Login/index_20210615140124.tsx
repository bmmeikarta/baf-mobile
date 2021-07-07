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
                <Input
                    placeholder='Password'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                            type="font-awesome"
                        />
                    }
                />

                <Button
                    title="Login"
                    containerStyle={styles.buttonStyle}
                />
            </View>
            <View
                style={{
                    alignItems: 'center',
                    bottom: 1
                }}
            >
                <Text style={{ color: 'black' }}>Created By IT BM @2021</Text>
            </View>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff',
        flexDirection: "column",
        height: '100%'
    },
    isi: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        alignItems: 'center',
        top: 25,
        padding: 20
    },
    logo: {
        width: 250,
        height: 250
    },
    input: {
        top: 10,
        width: '100%',
        padding: 10
    },
    buttonStyle: {
        borderRadius: 20
    }
})

export default Login