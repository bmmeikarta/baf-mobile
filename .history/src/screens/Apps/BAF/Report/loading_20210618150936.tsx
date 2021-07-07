import React from 'react'
import ContentLoader, { Facebook, BulletList } from 'react-content-loader/native'
import { Svg, G, Path, Rect, Circle } from 'react-native-svg'
import { Text } from 'react-native-elements'
import { View } from 'react-native'

const LoadingReport = () => {
    return <View>
        <BulletList width={100}
            height={100}
            viewBox="0 0 100 100" style={{ width: '100%' }} />
    </View>
}

export default LoadingReport