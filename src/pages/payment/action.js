import serverCall from '../../modules/serverCall'

export const fetchAddresses = (user_id) => {
    return dispatch => {
        dispatch({ type: 'FETCH_ADDRESSES_LOADING', loading: true, error: false })
        return serverCall({ method: 'GET', url: `/addresses?userId=${user_id}` }).then(res => {
            dispatch({ type: 'FETCH_ADDRESSES', loading: false, data: res.data.addresses, error: false })
        }).catch(err => {
            dispatch({ type: 'FETCH_ADDRESSES_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const insertAddress = (payload) => {
    return dispatch => {
        dispatch({ type: 'INSERT_ADDRESS_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/addresses`, data: payload }).then(res => {
            dispatch({ type: 'INSERT_ADDRESS', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'INSERT_ADDRESS_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const updateAddress = (payload) => {
    return dispatch => {
        dispatch({ type: 'UPDATE_ADDRESS_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/update_address`, data: payload }).then(res => {
            dispatch({ type: 'UPDATE_ADDRESS', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'UPDATE_ADDRESS_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const confirmOrder = (payload) => {
    return dispatch => {
        dispatch({ type: 'ORDER_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/order`, data: payload }).then(res => {
            dispatch({ type: 'ORDER', loading: false, data: res.data.order, error: false })
        }).catch(err => {
            dispatch({ type: 'ORDER_ERROR', loading: false, data: err, error: true })
        })
    }
}