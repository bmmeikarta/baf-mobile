import React from 'react'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, {Circle, Rect } from 'react-native-svg'
import { View, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;

const LoadingReport = () => {
    return <SvgAnimatedLinearGradient height={500} width={windowWidth}>
        <Rect x="15" y="15" rx="4" ry="4" width={'45%'} height="150"/>
        <Rect x="30" y="15" rx="4" ry="4" width={'45%'} height="150"/>
    </SvgAnimatedLinearGradient>
}

export default LoadingReport