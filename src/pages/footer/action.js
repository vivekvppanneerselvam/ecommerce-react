import serverCall from '../../modules/serverCall'
import axios from 'axios'


export const submitNewletter = (payload) => new Promise((resolve, reject) => {
    serverCall({ method: 'POST', url: `/order_count`, data: payload }).then(res => {
        resolve(res.data)
    }).catch(err => {
        reject(err)
    })
})