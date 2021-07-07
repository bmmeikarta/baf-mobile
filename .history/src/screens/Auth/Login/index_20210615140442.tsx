import React from "react"
import { StyleSheet, View, SafeAreaView, Image } from "react-native"
import {
    Button,
    Icon,
    Input,
    Text
} from "react-native-elements"

const Login = () => {
    const [form, setForms] = React.useState({
        username: '',
        password: ''
    })

    return <SafeAreaView style={styles.container}>
        <View style={styles.isi}>
            <Image source={require('../../../../assets/mkt.png')} style={styles.logo}></Image>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>BAF Application</Text>
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
        padding: 20,
        height: '100%'
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