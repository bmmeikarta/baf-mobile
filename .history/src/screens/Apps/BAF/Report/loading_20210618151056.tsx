import React from 'react'
import ContentLoader, { Facebook, BulletList } from 'react-content-loader/native'
import { Svg, G, Path, Rect, Circle } from 'react-native-svg'
import { Text } from 'react-native-elements'
import { View, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;

const LoadingReport = () => {
    return <BulletList 
        width={windowWidth}
        height={100}
        viewBox="100 0 100 100"
    />
}

export default LoadingReport