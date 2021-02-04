import serverCall from '../../modules/serverCall'

export const submitFAQ = (payload) => {
    return dispatch => {
        dispatch({ type: 'SUBMIT_FAQ_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/all_active_orders`, data: payload }).then(res => {
            return dispatch({ type: 'SUBMIT_FAQ', loading: false, data: res.data.order, error: false })
        }).catch(err => {
            dispatch({ type: 'SUBMIT_FAQ_ERROR', loading: false, data: err, error: true })
        })
    }
}
