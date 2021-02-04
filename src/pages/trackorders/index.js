import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Auth from '../../modules/Auth'
import { fetchActiveOrders } from './action'
import { Map } from 'immutable'
import noorders from '../../assets/images/no-order.svg'
import jumpTo from '../../modules/Navigation';
function TrackOrders(props) {
    const [activeOrders, setActiveOrders] = useState([])
    useEffect(() => {
        props.fetchActiveOrders(Auth.getUserId())
    }, [])

    useEffect(() => {
        if (!props.active_orders_loading) {
            if (!props.active_orders.toJS().error) {
                setActiveOrders(props.active_orders.toJS().data)
            }
        }
    }, [props.active_orders_loading])

    function onClickOrderId(id) {
        jumpTo('/track/' + id)
    }

    return (
        <div><br />
            <div className="container" style={{ marginTop: '75px' }}>
                {activeOrders.length > 0 ? activeOrders.map(item =>
                    <div><div className="card rounded-0">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6" style={{ textAlign: 'center' }}>
                                    <ul className="list-unstyled">
                                        <li><span className="text-muted">Order Id: <a onClick={() => onClickOrderId(item._id)}>{item._id}</a></span></li>
                                        <li><span className="text-muted">Created Date:</span>&nbsp;{item.createDate}</li>
                                        <li><span className="text-muted">Priority:</span>&nbsp;{item.priority}</li>
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <ul className="list-unstyled">
                                        <li><span className="text-muted">Payment Method: {item.paymentMethod}</span></li>
                                        <li><span className="text-muted">Total Amount:</span>&nbsp;{item.totalAmount}</li>
                                    </ul>
                                </div>
                            </div>
                        </div></div><br />
                    </div>) : <div className="card">
                        <div className="card-body"><div style={{ textAlign: 'center' }}><img src={noorders} /><br /><h4>No History of Orders</h4></div></div>
                    </div>}<br />
            </div>
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        active_orders_loading: state.TrackOrdersReducer.getIn(['active_order', 'loading'], true),
        active_orders: state.TrackOrdersReducer.getIn(['active_order'], new Map()),

    }
}
export default connect(mapStateToProps, { fetchActiveOrders })(TrackOrders)
