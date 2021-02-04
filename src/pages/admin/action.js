import serverCall from '../../modules/serverCall'
import axios from 'axios'


export const fetchPendingOrdersCount = new Promise((resolve, reject) => {
    serverCall({ method: 'GET', url: `/order_count` }).then(res => {
        resolve(res.data)
    }).catch(err => {
        reject(err)
    })
})


export const fetchUsersCount = new Promise((resolve, reject) => {
    serverCall({ method: 'GET', url: `/user_count` }).then(res => {
        resolve(res.data)
    }).catch(err => {
        reject(err)
    })
})


export const fetchOrders = () => {
    return dispatch => {
        dispatch({ type: 'FETCH_ORDERS_LOADING', loading: true, error: false })
        return serverCall({ method: 'GET', url: `/all_active_orders` }).then(res => {
            return dispatch({ type: 'FETCH_ORDERS', loading: false, data: res.data.order, error: false })
        }).catch(err => {
            dispatch({ type: 'FETCH_ORDERS_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const fetchProducts = () => {
    return dispatch => {
        dispatch({ type: 'FETCH_PRODUCTS_LOADING', loading: true, error: false })
        return serverCall({ method: 'GET', url: `/products` }).then(res => {
            return dispatch({ type: 'FETCH_PRODUCTS', loading: false, data: res.data.products, error: false })
        }).catch(err => {
            dispatch({ type: 'FETCH_PRODUCTS_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const addProduct = (payload) => {
    return dispatch => {
        dispatch({ type: 'ADD_PRODUCT_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/product`, data: payload }).then(res => {
            return dispatch({ type: 'ADD_PRODUCT', loading: false, data: res.data.product, error: false })
        }).catch(err => {
            dispatch({ type: 'ADD_PRODUCT_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const editProduct = (payload) => {
    return dispatch => {
        dispatch({ type: 'EDIT_PRODUCT_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/edit_product`, data: payload }).then(res => {
            return dispatch({ type: 'EDIT_PRODUCT', loading: false, data: res.data.product, error: false })
        }).catch(err => {
            dispatch({ type: 'EDIT_PRODUCT_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const fetchDepartments = () => {
    return dispatch => {
        dispatch({ type: 'FETCH_DEPARTMENTS_LOADING', loading: true, error: false })
        return serverCall({ method: 'GET', url: `/departments` }).then(res => {
            return dispatch({ type: 'FETCH_DEPARTMENTS', loading: false, data: res.data.departments, error: false })
        }).catch(err => {
            dispatch({ type: 'FETCH_DEPARTMENTS_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const addDepartment = (payload) => {
    return dispatch => {
        dispatch({ type: 'ADD_DEPARTMENT_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/departments`, data: payload }).then(res => {
            return dispatch({ type: 'ADD_DEPARTMENT', loading: false, data: res.data.departments, error: false })
        }).catch(err => {
            dispatch({ type: 'ADD_DEPARTMENT_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const editDepartment = (payload) => {
    return dispatch => {
        dispatch({ type: 'EDIT_DEPARTMENT_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/edit_department`, data: payload }).then(res => {
            return dispatch({ type: 'EDIT_DEPARTMENT', loading: false, data: res.data.departments, error: false })
        }).catch(err => {
            dispatch({ type: 'EDIT_DEPARTMENT_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const fetchCategories = () => {
    return dispatch => {
        dispatch({ type: 'FETCH_CATEGORIES_LOADING', loading: true, error: false })
        return serverCall({ method: 'GET', url: `/categories` }).then(res => {
            return dispatch({ type: 'FETCH_CATEGORIES', loading: false, data: res.data.categories, error: false })
        }).catch(err => {
            dispatch({ type: 'FETCH_CATEGORIES_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const addCategory = (payload) => {
    return dispatch => {
        dispatch({ type: 'ADD_CATEGORY_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/categories`, data: payload }).then(res => {
            return dispatch({ type: 'ADD_CATEGORY', loading: false, data: res.data.categories, error: false })
        }).catch(err => {
            dispatch({ type: 'ADD_CATEGORY_ERROR', loading: false, data: err, error: true })
        })
    }
}

