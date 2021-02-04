import React, { useState, useEffect } from 'react'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { trackSelectedOrder } from './action'
import jumpTo from '../../modules/Navigation'

function Track(props) {
    const [order, setOrder] = useState({})
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
            }
        }
    }, [props.track_order_loading])

    return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <div className="card mb-3">
                        <div className="p-4 text-center text-white bg-dark rounded-top">
                            <span className="text-uppercase">Tracking Order No - </span>
                            <span className="text-medium">{props.match.params.id}</span>
                        </div>
                        <div className="d-flex flex-wrap flex-sm-nowrap py-3 px-2 bg-secondary">
                            <div className="w-100 text-center py-1 px-2">
                                <span className="text-medium">Shipped Via:</span> UPS Ground</div>
                            <div className="w-100 text-center py-1 px-2">
                                <span className="text-medium">Status:</span> Processing Order</div>
                            <div className="w-100 text-center py-1 px-2">
                                <span className="text-medium">Ordered Date:</span> {order && order.createDate}</div>
                            <div className="w-100 text-center py-1 px-2">
                                <span className="text-medium">Expected Date:</span> {order && new Date(order.createDate).setDate(new Date(order.createDate).getDate() + 2)}</div>
                        </div>
                        <div className="card-body">
                            <div className="steps flex-sm-nowrap padding-top-1x padding-bottom-1x">
                                <div className={'step ' +(order ? (order.orderLevel >= 0 ? 'active' : '') : '')}>
                                    <i className="fa fa-shopping-bag"></i>
                                    <h4 className="step-title">Confirmed Order</h4>
                                </div>
                                <div className={'step ' +(order ? order.orderLevel >= 1 ? 'active' : '' : '')}>
                                    <i className="fa fa-spinner"></i>
                                    <h4 className="step-title">Processing Order</h4>
                                </div>
                                <div className={'step ' +(order ? order.orderLevel >= 2 ? 'active' : '' : '')}>
                                    <i className="fa fa-certificate"></i>
                                    <h4 className="step-title">Quality Check</h4>
                                </div>
                                <div className={'step ' +(order ? order.orderLevel >= 3 ? 'active' : '' : '')}>
                                    <i className="fa fa-truck"></i>
                                    <h4 className="step-title">Product Dispatched</h4>
                                </div>
                                <div className={'step ' +(order ? order.orderLevel >= 4 ? 'active' : '' : '')}>
                                    <i className="fa fa-home"></i>
                                    <h4 className="step-title">Product Delivered</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                        <div className="custom-control custom-checkbox mr-3">
                            <input className="custom-control-input" type="checkbox" id="notify_me" checked="" />
                            <label className="custom-control-label" for="notify_me">Notify me when order is delivered</label>
                        </div>
                        <div className="text-left text-sm-right">
                            <button className="btn btn-primary btn-sm rounded-0" onClick={()=>jumpTo('/order/'+props.match.params.id)}>View Order Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}
const mapStateToProps = (state) => {
    return {
        track_order_loading: state.TrackOrdersReducer.getIn(['track_order', 'loading'], true),
        track_order: state.TrackOrdersReducer.getIn(['track_order'], Map),
    }
}
export default connect(mapStateToProps, { trackSelectedOrder })(Track)
