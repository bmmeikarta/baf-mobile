import React from 'react'
import { WebView } from 'react-native-webview';

const Schedule = () => {
    return <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://easymovein.id/apieasymovein/baf/view/v_baf_bird_eye.php' }}
        style={{ marginTop: 20 }}
    />
}

export default Schedule
