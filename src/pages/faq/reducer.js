import { fromJS } from 'immutable'
let initialState = fromJS({});
function FAQReducer(state = initialState, action) {
    switch (action.type) {
        case 'SUBMIT_FAQ_LOADING':
            return state.setIn(['submit_faq', 'loading'], action.loading)
                .setIn(['submit_faq', 'error'], action.error)
        case 'SUBMIT_FAQ':
            return state.setIn(['submit_faq', 'data'], action.data)
                .setIn(['submit_faq', 'loading'], action.loading)
                .setIn(['submit_faq', 'error'], action.error)
        case 'SUBMIT_FAQ_ERROR':
            return state.setIn(['submit_faq', 'data'], action.data)
                .setIn(['submit_faq', 'loading'], action.loading)
                .setIn(['submit_faq', 'error'], action.error)
        default:
            return state
    }
}

export default FAQReducer