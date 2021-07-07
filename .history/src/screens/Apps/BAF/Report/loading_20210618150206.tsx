import React from 'react'
import ContentLoader, { Facebook } from 'react-content-loader/native'
import {Svg, G, Path, Rect, Circle } from 'react-native-svg'

const LoadingReport = () => {
    return <Svg width={25} height={30} viewBox="0 0 25 30" >
    <G id="App-Pages" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G id="Home" transform="translate(-327.000000, -50.000000)" fill={"#4A4A4A"}>
            <G id="Share-button-Icon" transform="translate(327.000000, 50.000000)">
                <G id="share">
                    <Path  fill={"#4A4A4A"} d="M4.71428571,10.2857143 C2.1147816,10.2857143 0,12.4004959 0,15 C0,17.5995041 2.1147816,19.7142857 4.71428571,19.7142857 C7.31378982,19.7142857 9.42857143,17.5995041 9.42857143,15 C9.42857143,12.4004959 7.31378982,10.2857143 4.71428571,10.2857143 Z M4.71428571,17.6190228 C3.26996141,17.6190228 2.09526295,16.4442684 2.09526295,15 C2.09526295,13.5557316 3.27001734,12.3809772 4.71428571,12.3809772 C6.15855409,12.3809772 7.33330848,13.5557316 7.33330848,15 C7.33330848,16.4442684 6.15861002,17.6190228 4.71428571,17.6190228 Z" id="Shape" fillRule="nonzero"></Path>
                    <Path  fill={"#4A4A4A"} d="M20.1428571,0 C17.543353,0 15.4285714,2.1147816 15.4285714,4.71428571 C15.4285714,7.31378982 17.543353,9.42857143 20.1428571,9.42857143 C22.7423613,9.42857143 24.8571429,7.31378982 24.8571429,4.71428571 C24.8571429,2.1147816 22.7423613,0 20.1428571,0 Z M20.1428571,7.33330848 C18.6985328,7.33330848 17.5238344,6.15861002 17.5238344,4.71428571 C17.5238344,3.26996141 18.6985888,2.09526295 20.1428571,2.09526295 C21.5871255,2.09526295 22.7618799,3.26996141 22.7618799,4.71428571 C22.7618799,6.15855409 21.5871814,7.33330848 20.1428571,7.33330848 Z" id="Shape" fillRule="nonzero"></Path>
                    <Path  fill={"#4A4A4A"} d="M20.1428571,20.5714286 C17.543353,20.5714286 15.4285714,22.6862227 15.4285714,25.2857422 C15.4285714,27.8852618 17.543353,30 20.1428571,30 C22.7423613,30 24.8571429,27.8852059 24.8571429,25.2856863 C24.8571429,22.6861668 22.7423613,20.5714286 20.1428571,20.5714286 Z M20.1428571,27.9047805 C18.6985328,27.9047805 17.5238344,26.7300751 17.5238344,25.2857422 C17.5238344,23.8414094 18.6985888,22.666704 20.1428571,22.666704 C21.5871255,22.666704 22.7618799,23.8414094 22.7618799,25.2857422 C22.7618799,26.7300192 21.5871814,27.9047805 20.1428571,27.9047805 Z" id="Shape" fillRule="nonzero"></Path>
                    <Rect  fill={"#4A4A4A"} id="Rectangle-path" fillRule="nonzero" transform="translate(12.428571, 10.714286) rotate(-32.893925) translate(-12.428571, -10.714286) " x={6.85714286} y={9.42857143} width={11.1428571} height={2.57142857}></Rect>
                    <Rect  fill={"#4A4A4A"} id="Rectangle-path" fillRule="nonzero" transform="translate(12.428571, 19.714286) rotate(-57.015526) translate(-12.428571, -19.714286) " x={11.1428571} y={14.5714286} width={2.57142857} height={10.2857143}></Rect>
                </G>
            </G>
        </G>
    </G>
</Svg>
}

export default LoadingReport