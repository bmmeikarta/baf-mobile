import React from 'react'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, {Circle, Rect } from 'react-native-svg'
import { View, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;

const LoadingReport = () => {
    return <SvgAnimatedLinearGradient height={500} width={windowWidth}>
        <Rect x="0" y="13" rx="4" ry="4" width={'95%'} height="50"/>
        <Rect x="0" y="75" rx="4" ry="4" width={'45%'} height="50"/>
        <Rect x={'50%'} y="75" rx="4" ry="4" width={'45%'} height="50"/>
    </SvgAnimatedLinearGradient>
}

export default LoadingReport