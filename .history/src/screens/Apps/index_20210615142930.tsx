import React from "react"
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native"
import {
    Button,
    Icon,
    Input,
    Text
} from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { FlatGrid, SectionGrid } from 'react-native-super-grid';

const AppsHome = () => {
    const Auth = useSelector(state => state.AuthInfo);

    return <SafeAreaView style={styles.container}>
        <View style={styles.isi}>
            <Text>ini home</Text>
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

export default AppsHome