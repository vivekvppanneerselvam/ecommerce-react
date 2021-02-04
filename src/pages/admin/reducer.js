import { fromJS } from 'immutable'
let initialState = fromJS({});
function AdminReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ORDERS_LOADING':
            return state.setIn(['orders', 'loading'], action.loading)
                .setIn(['orders', 'error'], action.error)
        case 'FETCH_ORDERS':
            return state.setIn(['orders', 'data'], action.data)
                .setIn(['orders', 'loading'], action.loading)
                .setIn(['orders', 'error'], action.error)
        case 'FETCH_ORDERS_ERROR':
            return state.setIn(['orders', 'data'], action.data)
                .setIn(['orders', 'loading'], action.loading)
                .setIn(['orders', 'error'], action.error)

        case 'FETCH_PRODUCTS_LOADING':
            return state.setIn(['products', 'loading'], action.loading)
                .setIn(['products', 'error'], action.error)
        case 'FETCH_PRODUCTS':
            return state.setIn(['products', 'data'], action.data)
                .setIn(['products', 'loading'], action.loading)
                .setIn(['products', 'error'], action.error)
        case 'FETCH_PRODUCTS_ERROR':
            return state.setIn(['products', 'data'], action.data)
                .setIn(['products', 'loading'], action.loading)
                .setIn(['products', 'error'], action.error)



        case 'FETCH_DEPARTMENTS_LOADING':
            return state.setIn(['departments', 'loading'], action.loading)
                .setIn(['departments', 'error'], action.error)
        case 'FETCH_DEPARTMENTS':
            return state.setIn(['departments', 'data'], action.data)
                .setIn(['departments', 'loading'], action.loading)
                .setIn(['departments', 'error'], action.error)
        case 'FETCH_DEPARTMENTS_ERROR':
            return state.setIn(['departments', 'data'], action.data)
                .setIn(['departments', 'loading'], action.loading)
                .setIn(['departments', 'error'], action.error)

        case 'ADD_DEPARTMENT_LOADING':
            return state.setIn(['add_department', 'loading'], action.loading)
                .setIn(['add_department', 'error'], action.error)
        case 'ADD_DEPARTMENT':
            return state.setIn(['add_department', 'data'], action.data)
                .setIn(['add_department', 'loading'], action.loading)
                .setIn(['add_department', 'error'], action.error)
        case 'ADD_DEPARTMENT_ERROR':
            return state.setIn(['add_department', 'data'], action.data)
                .setIn(['add_department', 'loading'], action.loading)
                .setIn(['add_department', 'error'], action.error)


        case 'EDIT_DEPARTMENT_LOADING':
            return state.setIn(['edit_department', 'loading'], action.loading)
                .setIn(['edit_department', 'error'], action.error)
        case 'EDIT_DEPARTMENT':
            return state.setIn(['edit_department', 'data'], action.data)
                .setIn(['edit_department', 'loading'], action.loading)
                .setIn(['edit_department', 'error'], action.error)
        case 'EDIT_DEPARTMENT_ERROR':
            return state.setIn(['edit_department', 'data'], action.data)
                .setIn(['edit_department', 'loading'], action.loading)
                .setIn(['edit_department', 'error'], action.error)


        case 'FETCH_CATEGORIES_LOADING':
            return state.setIn(['categories', 'loading'], action.loading)
                .setIn(['categories', 'error'], action.error)
        case 'FETCH_CATEGORIES':
            return state.setIn(['categories', 'data'], action.data)
                .setIn(['categories', 'loading'], action.loading)
                .setIn(['categories', 'error'], action.error)
        case 'FETCH_CATEGORIES_ERROR':
            return state.setIn(['categories', 'data'], action.data)
                .setIn(['categories', 'loading'], action.loading)
                .setIn(['categories', 'error'], action.error)


        case 'ADD_CATEGORY_LOADING':
            return state.setIn(['add_category', 'loading'], action.loading)
                .setIn(['add_category', 'error'], action.error)
        case 'ADD_CATEGORY':
            return state.setIn(['add_category', 'data'], action.data)
                .setIn(['add_category', 'loading'], action.loading)
                .setIn(['add_category', 'error'], action.error)
        case 'ADD_CATEGORY_ERROR':
            return state.setIn(['add_category', 'data'], action.data)
                .setIn(['add_category', 'loading'], action.loading)
                .setIn(['add_category', 'error'], action.error)


        default:
            return state
    }
}

export default AdminReducer