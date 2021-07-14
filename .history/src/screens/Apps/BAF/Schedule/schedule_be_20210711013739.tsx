import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { WebView } from 'react-native-webview';
import { Icon, ListItem, Badge, Header, Tab, TabView } from 'react-native-elements'

const Schedule = () => {
    return <View style={styles.container}>
        <Header
            leftComponent={<Icon
                name='chevron-left'
                type='font-awesome'
                size={20}
                color="white"
                onPress={() => Actions.pop()} />
            }
            centerComponent={{ text: 'Schedule', style: { color: '#fff' } }}
            barStyle="light-content"
        /><WebView
            originWhitelist={['*']}
            source={{ uri: 'https://easymovein.id/apieasymovein/baf/view/v_baf_bird_eye.php' }}
            style={{ marginTop: 30 }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff'
    },
})

export default Schedule
