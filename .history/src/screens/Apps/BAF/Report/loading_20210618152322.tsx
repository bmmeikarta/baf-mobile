import React from 'react'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, {Circle, Rect } from 'react-native-svg'
import { View, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;

const LoadingReport = () => {
    return <SvgAnimatedLinearGradient height={300} width={windowWidth}>
        <Rect x="0" y="13" rx="4" ry="4" width={'100%'} height="13"/>
    </SvgAnimatedLinearGradient>
}

export default LoadingReport