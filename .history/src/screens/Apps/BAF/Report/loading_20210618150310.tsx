import React from 'react'
import ContentLoader, { Facebook } from 'react-content-loader/native'
import {Svg, G, Path, Rect, Circle } from 'react-native-svg'
import {Text} from 'react-native-elements'

const LoadingReport = () => {
    return <Svg viewBox="0 0 36 28" width="100%" height="100%">
    <Rect fill="#EBECED" width="36" height="28" rx="4" />
    <Path
      fill="#999999"
      d="M5.8,4.5L4,8.7h1.2l0.3-0.8h2l0.3,0.8H9L7.2,4.5H5.8L5.8,4.5zM6.5,5.5L7.1,7H5.9L6.5,5.5L6.5,5.5z M9.1,8.7V4.5l1.7,0l1,2.7l1-2.7h1.7v4.2h-1.1V5.6l-1.1,3.1h-0.9l-1.1-3.1v3.1L9.1,8.7L9.1,8.7z M14.9,8.7V4.5h3.5v0.9h-2.4v0.7h2.3v0.9h-2.3v0.8h2.4v0.9H14.9L14.9,8.7z M18.5,8.7l1.7-2.1l-1.7-2.1h1.3l1,1.3l1-1.3h1.3l-1.7,2.1l1.7,2.1h-1.3l-1-1.3l-1,1.3L18.5,8.7L18.5,8.7z"
    />
    <Rect fill="#d3d3d3" x="4" y="10" width="6" height="5" rx="1" />
    <Text x="30" y="15" fontSize="3" textAnchor="middle">
      1234
    </Text>
    <Text x="18" y="19" fontSize="3" textAnchor="middle" fill="#838383">
      3333 122222 60000
    </Text>
  </Svg>
}

export default LoadingReport