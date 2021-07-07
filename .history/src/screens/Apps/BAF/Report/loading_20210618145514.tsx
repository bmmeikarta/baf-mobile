import React from 'react'
import ContentLoader, { Facebook, Circle, Rect } from 'react-content-loader/native'

const LoadingReport = () => {
    return <ContentLoader viewBox="0 0 380 70">
        <Rect x="0" y="17" rx="4" ry="4" width="300" height="13" />
    </ContentLoader>
}

export default LoadingReport