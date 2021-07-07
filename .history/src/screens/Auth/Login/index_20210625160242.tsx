import React from "react"
import { StyleSheet, View, SafeAreaView, Image, Alert } from "react-native"
import {
    Button,
    Icon,
    Input,
    Text
} from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { Actions } from 'react-native-router-flux'

import ApiConnection from "../../../configs/apiConnections"

const Login = () => {
    const Auth = useSelector(state => state.AuthInfo);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = React.useState(false)
    const [form, setForms] = React.useState({
        username: '',
        password: ''
    })

    React.useEffect(() => {
        if (Auth.username && Auth.username !== '') {
            Actions.home()
        }
    }, [JSON.stringify(Auth.username)])

    const onLogin = async () => {
        setLoading(true)
        const send = await ApiConnection('post', '?mname=authorization&function=login', form);

        if (send.status === 'success') {
            dispatch({ type: 'SET_LOGIN_STATE', payload: send.data.data })
            setLoading(false)
            const sect = await getSection()
            
            if (sect) {
                Actions.home()
            }
        } else {
            console.log(send.data)
            setLoading(false)
            Alert.alert(
                "Error",
                send.data.message
            )
        }
    }

    const getSection = () => {
        if (Auth.menuDetail.detail) {
            const hasil = Auth.menuDetail.detail.filter((val: { roles_parent_id: any; }) => !val.roles_parent_id)
            console.log(hasil)
            let hasilnya: { title: any; data: any[]; }[] = []
            hasil.map((val: { id: any; menu: { menu_desc: any; }; }) => {
                const child = Auth.menuDetail.detail.filter((valDet: { roles_parent_id: any; }) => valDet.roles_parent_id === val.id)
    
                let hasilDet: any[] = []
                child.map((valDetMap: { menu: any; }) => {
                    hasilDet.push({
                        ...valDetMap.menu,
                        code: '#1abc9c'
                    })
                })
    
                hasilnya.push({
                    title: val.menu.menu_desc,
                    data: hasilDet
                })
            })
    
            dispatch({ type: 'SET_PARSED_MENU', payload: hasilnya })

            return hasilnya
        } else {
            return false
        }
    }

    return <SafeAreaView style={styles.container}>
        <View style={styles.isi}>
            <Image source={require('../../../../assets/mkt.png')} style={styles.logo}></Image>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>BAF Application</Text>
            <View style={styles.input}>
                <Input
                    placeholder='Email'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                            type="font-awesome"
                        />
                    }
                    onChangeText={(nextValue: any) => setForms({ ...form, username: nextValue })}
                />
                <Input
                    placeholder='Password'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                            type="font-awesome"
                        />
                    }
                    onChangeText={(nextValue: any) => setForms({ ...form, password: nextValue })}
                    secureTextEntry={true} 
                />

                <Button
                    title="Login"
                    containerStyle={styles.buttonStyle}
                    onPress={() => onLogin()}
                    loading={isLoading}
                    disabled={isLoading}
                />
            </View>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff',
        flexDirection: "column"
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
    }
})

export default Login