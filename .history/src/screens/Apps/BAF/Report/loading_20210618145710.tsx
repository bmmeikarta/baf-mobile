import React from 'react'
import ContentLoader, { Facebook } from 'react-content-loader/native'
import { Rect, Circle } from 'react-native-svg'

const LoadingReport = () => {
    return <ContentLoader viewBox="0 0 380 70">
        <Rect
    x="25"
    y="5"
    width="150"
    height="50"
    fill="rgb(0,0,255)"
    strokeWidth="3"
    stroke="rgb(0,0,0)"
  />
    </ContentLoader>
}

export default LoadingReport