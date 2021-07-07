import React from "react"
import { StyleSheet, View, SafeAreaView, TouchableOpacity, StatusBar } from "react-native"
import {
    Button,
    Icon,
    Input,
    Text
} from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { FlatGrid, SectionGrid } from 'react-native-super-grid';

const AppsHome = () => {
    const Auth = useSelector(state => state.AuthInfo);

    return <SafeAreaView>
        <StatusBar translucent backgroundColor="transparent" />
        {
            <SectionGrid
                itemDimension={155}
                sections={Auth.parsedMenu}
                style={styles.gridView}
                renderItem={({ item, section, index }) => (
                    <TouchableOpacity onPress={() => console.log([item.menu_url, item.menu_name])}>
                        <View style={[styles.itemContainers, { backgroundColor: '#ff983d' }]}>
                            <Icon
                                style={styles.icon}
                                color='white'
                                type='font-awesome'
                                name={item.menu_icon}
                                size={50}
                            />
                            <View style={{
                                height: '100%',
                                alignItems: 'center',
                                paddingTop: 15
                            }}>
                                <Text style={styles.itemName}>{item.menu_name}</Text>
                                <Text style={styles.itemCode}>{item.menu_desc}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
            />
        }
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff',
        flexDirection: "column",
        padding: 10
    },
    isi: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        alignItems: 'center',
        top: 25,
        padding: 20,
        height: '100%'
    },
    logo: {
        width: 250,
        height: 250
    },
    input: {
        top: 10,
        width: '100%',
        padding: 10
    },
    buttonStyle: {
        borderRadius: 20
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainers: {
        borderRadius: 5,
        padding: 10,
        height: 150,
        flexDirection: "column",
        alignItems: 'center',
    },itemName: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: 'white',
    },
    sectionHeader: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        alignItems: 'center',
        backgroundColor: '#4E598C',
        color: 'white',
        padding: 10,
    }
})

export default AppsHome