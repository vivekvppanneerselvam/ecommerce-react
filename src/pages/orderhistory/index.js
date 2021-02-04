import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Auth from '../../modules/Auth'
import { fetchOrderHistory } from './action'
import { Map } from 'immutable'
import nohistory from '../../assets/images/no-orders_2x.webp'
import paid from '../../assets/images/paid.png'

function OrderHistory(props) {
    const [history, setHistory] = useState([])
    useEffect(() => {
        props.fetchOrderHistory(Auth.getUserId())
    }, [])

    useEffect(() => {
        if (!props.history_loading) {
            if (!props.history.toJS().error) {
                setHistory(props.history.toJS().data)
            }
        }
    }, [props.history_loading])


    return (
        <div className="container" style={{ marginTop: '75px' }} ><br />

            {history.length > 0 ? history.map(item =>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-5" style={{ textAlign: 'center' }}>
                                <ul className="list-unstyled">
                                    <li><span className="text-muted">Order Id: {item._id}</span></li>
                                    <li><span className="text-muted">Created Date:</span>&nbsp;{item.createDate}</li>
                                    <li><span className="text-muted">Priority:</span>&nbsp;{item.priority}</li>
                                </ul>
                            </div>
                            <div className="col-sm-2"><img src={paid} style={{ height: '75px' }} /></div>
                            <div className="col-sm-5">
                                <ul className="list-unstyled">
                                    <li><span className="text-muted">Payment Method: {item.paymentMethod}</span></li>
                                    <li><span className="text-muted">Total Amount:</span>&nbsp;{item.totalAmount}</li>
                                </ul>
                            </div>

                        </div>
                    </div></div>) : <div className="card">
                    <div className="card-body"><div style={{ textAlign: 'center' }}><img src={nohistory} /><br /><h4>No History of Orders</h4></div></div>
                </div>}
            <br />
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        history_loading: state.OrderHistoryReducer.getIn(['history', 'loading'], true),
        history: state.OrderHistoryReducer.getIn(['history'], Map),
    }
}
export default connect(mapStateToProps, { fetchOrderHistory })(OrderHistory)
