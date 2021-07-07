import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";

const Schedule = () => {
    return (
        <View style={styles.container}>
            <Text>Halo ini schedule</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff'
    },
})

export default Schedule