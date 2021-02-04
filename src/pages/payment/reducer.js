import { fromJS } from 'immutable'
let initialState = fromJS({});
function CheckOutReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ADDRESSES_LOADING':
            return state.setIn(['addresses', 'loading'], action.loading)
                .setIn(['addresses', 'error'], action.error)
        case 'FETCH_ADDRESSES':
            return state.setIn(['addresses', 'data'], action.data)
                .setIn(['addresses', 'loading'], action.loading)
                .setIn(['addresses', 'error'], action.error)
        case 'FETCH_ADDRESSES_ERROR':
            return state.setIn(['addresses', 'data'], action.data)
                .setIn(['addresses', 'loading'], action.loading)
                .setIn(['addresses', 'error'], action.error)

        case 'INSERT_ADDRESS_LOADING':
            return state.setIn(['insert_address', 'loading'], action.loading)
                .setIn(['insert_address', 'error'], action.error)
        case 'INSERT_ADDRESS':
            return state.setIn(['insert_address', 'data'], action.data)
                .setIn(['insert_address', 'loading'], action.loading)
                .setIn(['insert_address', 'error'], action.error)
        case 'INSERT_ADDRESS_ERROR':
            return state.setIn(['insert_address', 'data'], action.data)
                .setIn(['insert_address', 'loading'], action.loading)
                .setIn(['insert_address', 'error'], action.error)

        case 'UPDATE_ADDRESS_LOADING':
            return state.setIn(['update_address', 'loading'], action.loading)
                .setIn(['update_address', 'error'], action.error)
        case 'UPDATE_ADDRESS':
            return state.setIn(['update_address', 'data'], action.data)
                .setIn(['update_address', 'loading'], action.loading)
                .setIn(['update_address', 'error'], action.error)
        case 'UPDATE_ADDRESS_ERROR':
            return state.setIn(['update_address', 'data'], action.data)
                .setIn(['update_address', 'loading'], action.loading)
                .setIn(['update_address', 'error'], action.error)

        case 'ORDER_LOADING':
            return state.setIn(['order', 'loading'], action.loading)
                .setIn(['order', 'error'], action.error)
        case 'ORDER':
            return state.setIn(['order', 'data'], action.data)
                .setIn(['order', 'loading'], action.loading)
                .setIn(['order', 'error'], action.error)
        case 'ORDER_ERROR':
            return state.setIn(['order', 'data'], action.data)
                .setIn(['order', 'loading'], action.loading)
                .setIn(['order', 'error'], action.error)

        default:
            return state
    }
}

export default CheckOutReducer