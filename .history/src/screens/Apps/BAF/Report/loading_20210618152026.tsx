import React from 'react'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, {Circle, Rect } from 'react-native-svg'
import { View, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;

const LoadingReport = () => {
    return <SvgAnimatedLinearGradient height={300}>
        <Circle cx="30" cy="30" r="30"/>
        <Rect x="75" y="13" rx="4" ry="4" width="100" height="13"/>
        <Rect x="75" y="37" rx="4" ry="4" width="50" height="8"/>
        <Rect x="0" y="70" rx="5" ry="5" width={windowWidth} height="200"/>
    </SvgAnimatedLinearGradient>
}

export default LoadingReport