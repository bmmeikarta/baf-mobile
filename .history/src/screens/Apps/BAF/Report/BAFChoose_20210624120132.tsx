import React from "react";
import { Button, Badge, Icon } from "react-native-elements";
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    Platform,
    Alert
} from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import { useDispatch, useSelector } from "react-redux";

import HeaderAssign from "./Header";

const windowWidth = Dimensions.get('window').width;

const BAFChoose = () => {
    const Master = useSelector(state => state.Master)

    const carouselRef = React.useRef(null)
    const [BAFList, setBAFList] = React.useState([])
    const [choosedIndex, setChoosedIndex] = React.useState('')

    React.useEffect(() => {
        if (Master.categoryList.length > 0) {
            let catBAF = []
            Master.categoryList.map(val => {
                catBAF.push({
                    ...val,
                    photoList: [],
                    label: val.baf_cat_name,
                    image: val.baf_cat_name === 'Kebersihan'
                        ? require('../../../../../assets/cleaning.jpg')
                        : val.baf_cat_name === 'Keamanan'
                            ? require('../../../../../assets/secure.jpg')
                            : require('../../../../../assets/functional.jpg'),
                    oklabel: val.baf_cat_name === 'Kebersihan'
                        ? 'Bersih'
                        : val.baf_cat_name === 'Keamanan'
                            ? 'Aman'
                            : 'Fungsional',
                    noklabel: val.baf_cat_name === 'Kebersihan'
                        ? 'Tidak Bersih'
                        : val.baf_cat_name === 'Keamanan'
                            ? 'Tidak Aman'
                            : 'Tidak Berfungsi'
                })
            })

            setBAFList(catBAF)
        }
    }, [JSON.stringify(Master.categoryList)])

    const choosedBAF = (data: any, idx: any) => {
        if (data.statusLabel === 'ok') {
            BAFList[idx].photoList = [{
                id: data.id,
                photo: '',
                status: data.statusLabel
            }]

            console.log(BAFList)
        }
        setChoosedIndex(idx)
    }

    const renderItem = ({ item, index }, parallaxProps: any) => {
        return (
            <View style={styles.item}>
                <View style={styles.imageContainer}>
                    <ParallaxImage
                        source={item.image}
                        containerStyle={styles.imageContainer}
                        parallaxFactor={0.5}
                        {...parallaxProps}
                    />
                </View>
                <View style={[styles.textContainer, { height: '30%' }]}>
                    <Text numberOfLines={2} style={styles.subtitle}>
                        {item.label}
                    </Text>
                    <View style={{
                        position: 'absolute',
                        bottom: 10,
                        alignSelf: 'center'
                    }}>
                        <View style={{
                            padding: 5,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            flex: 1,
                        }}>
                            <Button
                                title={item.oklabel}
                                containerStyle={{ width: '50%', paddingRight: 5 }}
                                onPress={() => choosedBAF({ ...item, statusLabel: 'ok' }, index)}
                            />
                            <Button
                                title={item.noklabel}
                                containerStyle={{ width: '50%', paddingLeft: 5 }}
                                buttonStyle={{ backgroundColor: 'red' }}
                                onPress={() => choosedBAF({ ...item, statusLabel: 'nok' }, index)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    
    return <View style={styles.container}>
        <HeaderAssign
            title={'Update BAF'}
            zone={true}
            tower={false}
        />

        <View style={styles.contentCon}>
        <Carousel
            ref={carouselRef}
            data={BAFList}
            renderItem={renderItem}
            sliderWidth={windowWidth}
            sliderHeight={windowWidth}
            itemWidth={windowWidth - 60}
            hasParallaxImages={true}
            style={styles.slideInnerContainer}
        /></View>
    </View>
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const wp = (percentage: number) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff'
    },
    contentCon: {
        top: 70,
        height: '100%'
    },
    item: {
        width: windowWidth - 60,
        height: windowWidth - 60,
    },
    slideInnerContainer: {
        width: windowWidth,
        height: windowWidth,
        paddingHorizontal: wp(2),
        paddingBottom: 18 // needed for shadow
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.OS === 'ios' ? 8 : 0, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    textContainer: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        // width: windowWidth,
        bottom: 0,
        width: '100%'
    },
    subtitle: {
        top: 10,
        left: 10,
        color: 'white',
        fontSize: 20,
        backgroundColor: 'transparent',
        fontStyle: 'italic',
        fontWeight: 'bold',
        position: 'absolute'
    },
})

export default BAFChoose