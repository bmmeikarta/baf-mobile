import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Header, Icon, Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import Svg, { Circle, Rect, Text as TextSVG } from 'react-native-svg'
import Modal from 'react-native-modalbox';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SnackBar from 'react-native-snackbar-component'
import HeaderAssign from "./Header";

const ZoneChoose = () => {
    const Master = useSelector(state => state.Master)
    const dispatch = useDispatch()

    const [scheduleUser, setScheduleUser] = React.useState({})
    const [choosedBlock, setChoosedBlock] = React.useState('')
    const [choosedTower, setChoosedTower] = React.useState('')
    const [scanQRCode, setScanQRCode] = React.useState(false)

    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);

    const [snackAlert, setSnackAlert] = React.useState('')
    const [showSnack, setShowSnack] = React.useState(false)

    const [storedData, setStoredData] = React.useState([])

    React.useEffect(() => {
        if (Object.keys(Master.mkrt_unit).length > 0) {
            setChoosedBlock(Master.schedule_now.unit_blocks)
            setChoosedTower(Master.schedule_now.unit_tower)

            if (Master.schedule_now) {
                setScheduleUser(Master.schedule_now)
            }
        }

        // QR Code
        (async () => {
            dispatch({ type: 'SET_CHOOSED_ZONE', payload: '' })
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, [JSON.stringify(Master.schedule_now)])

    React.useEffect(() => {
        if (Master.historyStore && Master.historyStore.length > 0) {
            setStoredData(Master.historyStore)
        }
    },[JSON.stringify(Master.historyStore)])
    const onChooseZone = (zone: any) => {
        dispatch({ type: 'SET_CHOOSED_ZONE', payload: zone })
        setScanQRCode(true)
    }

    // 53022-1B-4-ZONA1-1
    const handleBarCodeScanned = ({ type, data }) => {
        const parsingData = data.split("-")
        const filterFloor = scheduleUser.floor.filter(val => val.floor == Master.choosedFloor.floor)

        console.log(parsingData)
        console.log(filterFloor)
        console.log(scheduleUser)
        console.log(Master.choosedFloor.floor)
        console.log(Master.choosedZone)

        console.log(parsingData[0] === scheduleUser.unit_blocks)
        console.log(parsingData[1] === scheduleUser.unit_tower)
        console.log(parsingData[3] === `ZONA${Master.choosedZone}`)
        console.log(filterFloor.length)
        if (
            parsingData[0] === scheduleUser.unit_blocks &&
            parsingData[1] === scheduleUser.unit_tower &&
            parsingData[2] == Master.choosedFloor.floor &&
            parsingData[3] === `ZONA${Master.choosedZone}`
        ) {
            setScanned(true)
            dispatch({ type: 'SET_SCAN_ZONE', payload: data })
            setScanned(false)
            setScanQRCode(false)
            Actions.bafReport()
        } else {
            setScanned(false)
            setScanQRCode(false)

            setSnackAlert('Your Choosed Zone / Floor is no match with scanned QR Code !')
            setShowSnack(true)

            setTimeout(() => {
                setShowSnack(false)
            }, 5000);
        }
    };

    const checkZoneStored = (zone: any) => {
        const data = storedData.some(val => val.some(valDet => 
            valDet.baf_blocks === Master.schedule_now.unit_blocks &&
            valDet.baf_tower === Master.schedule_now.unit_tower && 
            valDet.baf_floor === Master.choosedFloor.floor &&
            valDet.baf_zone === zone
        ))

        return data
    }

    return <View style={styles.container}>
        <HeaderAssign 
            title={'Choose Zone'}
            zone={false}
            tower={false}
        />

        <View style={{
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            height: '80%',
            flex: 1
        }}>
            <TouchableOpacity onPress={() => onChooseZone(3)} style={{ width: 50, height: 80 }}>
                <View style={{ width: 50, height: 80, justifyContent: 'center' }}>
                    <Svg width="50" height="80">
                        <Rect
                            x="0"
                            y="0"
                            width="50"
                            height="80"
                            fill="blue"
                        />
                    </Svg>
                    <Text style={{ position: 'absolute', left: 3, color: 'white' }}>Zone 3</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 170, height: 50 }} onPress={() => onChooseZone(2)}>
                <View style={{ width: 170, height: 50, justifyContent: 'center' }}>
                    <Svg width="170" height="50">
                        <Rect
                            x="0"
                            y="0"
                            width="170"
                            height="50"
                            fill="#ffcea1"
                        />
                    </Svg>
                    <Text style={{ position: 'absolute', left: '50%' }}>Zone 2</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 50, height: 80 }} onPress={() => onChooseZone(4)}>
                <View style={{ width: 50, height: 80, justifyContent: 'center' }}>
                    <Svg width="50" height="80">
                        <Rect
                            x="0"
                            y="0"
                            width="50"
                            height="80"
                            fill="green"
                        />
                        <Text style={{ position: 'absolute', color: 'white', top: 30, left: 3 }}>Zone 4</Text>
                    </Svg>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ left: 170, bottom: 170, width: 50, height: 120 }} onPress={() => onChooseZone(1)}>
                <View style={{ width: 50, height: 120, justifyContent: 'center' }}>
                    <Svg width="50" height="120">
                        <Rect
                            x="0"
                            y="0"
                            width="50"
                            height="120"
                            fill={checkZoneStored(1) ? "grey" : "orange"}
                        />
                    </Svg>
                    <Text style={{ position: 'absolute', color: 'white', left: 3 }}>Zone 1</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={{
            position: 'absolute'
        }}>
            <Text>Stored</Text>
        </View>

        <Modal isOpen={scanQRCode} position={"bottom"} onClosed={() => setScanQRCode(false)} style={{ height: '100%' }}>
            <View style={styles.modalContainer}>
                {
                    Master.choosedZone !== '' && scanQRCode
                        ? <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                        : <Text>Please choose zone first</Text>
                }
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
        </Modal>

        <SnackBar
            visible={showSnack}
            textMessage={snackAlert}
            actionHandler={() => { setShowSnack(false) }}
            actionText="Okay"
            messageStyle={{ backgroundColor: 'red' }}
            actionStyle={{ backgroundColor: 'red', color: 'white', height: '100%' }}
        />
    </View>
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        top: 30,
        padding: 10
    },
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff'
    },
    containerContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    contactItemStyle: {
        height: 40, width: '50%'
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 50,
    },
    itemContainerList: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 50,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        alignContent: 'center',
        textAlign: 'center'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
})

export default ZoneChoose