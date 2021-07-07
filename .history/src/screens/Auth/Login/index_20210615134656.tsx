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
        <Input
            placeholder='INPUT WITH CUSTOM ICON'
            leftIcon={
                <Icon
                    name='user'
                    size={24}
                    color='black'
                    type="font-awesome"
                />
            }
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffb029'
    }
})

export default Login