import axios from 'axios'

import {store} from '../configs/storeConfig'
import {Actions} from 'react-native-router-flux'

const ApiConnection = async (methods: string | number, url: any, data = null, authState = false, isUpload = false, isFile = false) => {    
    const state = store.getState();

    const headerAxios = axios.create({
        baseURL: 'https://easymovein.id/apieasymovein/baf'
    })

    try {
        let header = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS'
        }

        if (authState) {
            header = {
                ...header,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.AuthInfo.token}`
            }
        } else if (isUpload) {
            header = {
                ...header,
                'Content-Type': 'multipart/form-data'
            }
        } else if (isFile) {
            header = {
                ...header,
                'Content-Type': 'application/json',
                responseType: 'blob',
            }
        }

        let process
        if (data) {
            process = headerAxios[methods](url, {param: data}, {headers: header})
        } else {
            process = headerAxios[methods](url, {headers: header})
        }
        
        const request = await process.then((result: any) => {
            return {
                status: 'success',
                data: result.data
            }
        }).catch((e: { response: { status: number; data: { errors: { [x: string]: any } } } }) => {
            if (e.response.status === 422) {
                return {
                    status: 'failed',
                    data: e.response.data,
                    desc: 'unauthenticate'
                }
            } else if (e.response.status === 401) {
                store.dispatch({ type: 'LOGOUT' })
                return Actions.login()
            }

            return {
                status: 'failed',
                data: e.response.data,
                desc: 'Failed server'
            }
        })

        if (request) {
            return request
        }
    } catch (error) {
        return error
    }
}

export default ApiConnection