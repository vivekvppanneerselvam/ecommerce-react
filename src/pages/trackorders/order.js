import React, { useState, useEffect } from 'react'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { trackSelectedOrder, getSelectedOrderAddress, getCartById, updateOrder } from './action'
import { getCheckoutUrl } from '../../redux/action/checkoutAction'
import Review from '../payment/component/review';
import calcPrice from '../../components/calcPrice'
import Confirmation from '../../components/confirmation'

let arr = [{ key: -1, value: 'New' },
{ key: 0, value: 'Confirmed Order' },
{ key: 1, value: 'Processing Order' },
{ key: 2, value: 'Quality Check' },
{ key: 3, value: 'Product Dispatched' },
{ key: 4, value: 'Product Delivered' }
]
function Order(props) {
    const [order, setOrder] = useState({})
    const [cart, setCart] = useState({})
    const [address, setAddress] = useState({})
    const [comment, setComment] = useState('')
    const [confirmationFlg, setConfirmationFlg] = useState(false)
    console.log(props.match.params.id)
    useEffect(() => {
        props.trackSelectedOrder(props.match.params.id)
    }, [])

    useEffect(() => {
        if (!props.track_order_loading) {
            if (!props.track_order.toJS().error) {
                Object.keys(props.track_order.toJS().data[0]).map(key => {
                    setOrder(prevState => {
                        prevState[key] = props.track_order.toJS().data[0][key]
                        return ({ ...prevState })
                    })
                })
                props.getCartById(props.track_order.toJS().data[0].cartId)
                props.getSelectedOrderAddress(props.track_order.toJS().data[0].addressId)
            }
        }
    }, [props.track_order_loading])

    useEffect(() => {
        if (!props.cart_loading) {
            if (!props.cart.toJS().error) {
                Object.keys(props.cart.toJS().data).map(key => {
                    setCart(prevState => {
                        prevState[key] = props.cart.toJS().data[key]
                        return ({ ...prevState })
                    })
                })
            }
        }
    }, [props.cart_loading])

    useEffect(() => {
        if (!props.address_by_id_loading) {
            if (!props.address_by_id.toJS().error) {
                Object.keys(props.address_by_id.toJS().data[0]).map(key => {
                    setAddress(prevState => {
                        prevState[key] = props.address_by_id.toJS().data[0][key]
                        return ({ ...prevState })
                    })
                })
            }
        }
    }, [props.address_by_id_loading])

    useEffect(() => {
        if (!props.update_order_loading) {
            if (!props.update_order.toJS().error) {
                alert("Order updated successfully.")
                setComment('')
            } else {
                alert("Error while updating order.")
            }
        }
    }, [props.update_order_loading])

    const onChangeHandler = (e) => {
        let id = e.target.id, value = e.target.value
        if (value) {
            setOrder(prevState => {
                prevState[id] = value
                return ({ ...prevState })
            })
        }
    }
    function updateOrderStatus() {
        if (order) {
            props.updateOrder(order)
        }
    }

    function cancelOrder() {
        setConfirmationFlg(true)

    }

    function postComment() {
        if (order && comment) {
            setOrder(prevState => {
                let commentsArr = prevState.comments
                prevState.comments = commentsArr.push(comment)
                return ({ ...prevState })
            })
            props.updateOrder(order)
        }
    }

    function confirmationHandler() {
        if (order) {
            setOrder(prevState => {
                prevState.orderLevel = 5
                return ({ ...prevState })
            })
            props.updateOrder(order)
        }
    }

    function closeHandler() {
        setConfirmationFlg(false)
    }

    console.log(props.user)
    return (
        <div><br />
            {confirmationFlg && <Confirmation
                showModal={confirmationFlg}
                handleClose={(e) => closeHandler()}
                handleConfirmationMessage={(e) => confirmationHandler(e)}
                title={'Confirmation'}
            > <span>Are you sure you want to cancel the order</span>

            </Confirmation>}
            <div className="jumbotron">
                <div className="container">
                    {props.user.hasOwnProperty('admin') ?
                        props.user.admin && <div className={'row pull-right'}>
                            <div className={'col-md-10'}> <select className={'form-control rounded-0'} id={'orderLevel'} value={order && order.orderLevel} onChange={(e) => onChangeHandler(e)}>
                                <option value='' >Select</option>
                                {arr.map(item => <option value={item.key}>{item.value}</option>)}
                            </select></div> <div className={'col-md-2'}>
                                <button className={'btn btn-danger btn-sm rounded-0'} onClick={() => updateOrderStatus()}>Save</button></div>
                        </div>
                        : <div></div>}
                    <br />
                    <div className={'row'}>
                        <div className={'col-md-6'}>
                            <h4>User Information</h4><hr />
                            <ul>
                                <li><strong>Name:</strong> {props.user && props.user.user_name}</li>
                                <li><strong>Email :</strong>{props.user && props.user.email}</li>
                            </ul>
                            <h4>Order Details</h4><hr />
                            <ul>
                                <li><strong>Priority:</strong> {order && order.priority}</li>
                                <li><strong>Total Amount :</strong>{order && order.totalAmount}</li>
                                <li><strong>Payment Method :</strong>{order && order.paymentMethod}</li>
                                <li><strong>Payment Status :</strong>{order && order.paymentStatus ? 'Done' : 'In Complete'}</li>
                                <li><strong>Order Process :</strong>{order && arr.filter(item => item.key === order.orderLevel).map(item => item.value)[0]}</li>
                            </ul>
                        </div>
                        <div className={'col-md-6'}>
                            <h4>Address Information</h4><hr />
                            <ul>
                                <li><strong>Address 1:</strong> {address && address.address1}</li>
                                <li><strong>Address 2 :</strong>{address && address.address2}</li>
                                <li><strong>City :</strong>{address && address.city} Pincode:{address && address.pincode} </li>
                                <li><strong>State :</strong>{address && address.state}</li>
                                <li><strong>Land Mark :</strong>{address && address.landMark}</li>
                                <li><strong>Phone No :</strong>{address && address.phoneNo}</li>
                                <li><strong>Address Type :</strong>{address && address.addressType}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row"><div className={'col-md-6'}><Review cart={cart} /><br /></div>
                        <div className={'col-md-6'}> <br /><br /><br /><ul>
                            <li><strong>Total Quatity :</strong>{cart && cart.totalQty}</li>
                            <li><strong>Sub Total:</strong>Rs. {cart && cart.totalPrice}</li>
                            <li><strong>Delivery Charges :</strong>{'Free'}</li>
                            <li><strong>Estimated tax :</strong>Rs. {calcPrice(cart.totalPrice).taxes}</li>
                            <li><strong>Total :</strong>Rs. {calcPrice(cart.totalPrice).total}</li>
                        </ul></div>
                    </div>
                    <div className={'row '}>
                        <div className={'col-6 '}>
                            <textarea className={'form-control rounded-0'} value={comment} onChange={(e) => setComment(e.target.value)} />
                            <button className={'btn btn-danger rounded-0 btn-sm'} onClick={() => postComment()}>Post</button>
                        </div>
                        <div className="col-6 pull-right">
                            <button className={'btn btn-danger rounded-0 btn-sm'} onClick={() => cancelOrder()}>Cancel Order</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        track_order_loading: state.TrackOrdersReducer.getIn(['track_order', 'loading'], true),
        track_order: state.TrackOrdersReducer.getIn(['track_order'], Map),
        address_by_id_loading: state.TrackOrdersReducer.getIn(['address_by_id', 'loading'], true),
        address_by_id: state.TrackOrdersReducer.getIn(['address_by_id'], Map),
        cart_loading: state.TrackOrdersReducer.getIn(['cart_by_id', 'loading'], true),
        cart: state.TrackOrdersReducer.getIn(['cart_by_id'], Map),
        update_order_loading: state.TrackOrdersReducer.getIn(['update_order', 'loading'], true),
        update_order: state.TrackOrdersReducer.getIn(['update_order'], Map),
        user: state.token.user_token
    }
}
export default connect(mapStateToProps, { trackSelectedOrder, getSelectedOrderAddress, getCartById, updateOrder })(Order)