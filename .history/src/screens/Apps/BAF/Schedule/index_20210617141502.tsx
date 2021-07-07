import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

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
        backgroundColor: '#fff',
        flexDirection: "column"
    },
})

export default Schedule