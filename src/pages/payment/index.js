import React, { useState, useEffect } from 'react'
import OrderSummary from './component/ordersummary'
import Shipping from './component/shipping';
import PaymentSection from './component/payment';
import Review from './component/review';
import Address from './component/address';
import { getCheckoutUrl, getPaypalUrl } from '../../redux/action/checkoutAction'
import { getCartByUserId } from '../../redux/action/cartAction'
import { connect } from 'react-redux'
import { fetchAddresses, confirmOrder } from './action'
import Auth from '../../modules/Auth'
import calcPrice from '../../components/calcPrice'
import jumpTo from '../../modules/Navigation';
import { Map } from 'immutable'


let obj = {
  userId: '',
  cartId: '',
  addressId: '',
  priority: '',
  totalAmount: '',
  paymentMethod: 'cod',
  paymentStatus: false,
  orderStatus: '',
  orderLevel: -1,
  shippingType: '',
  createDate: '',
  endDate: '',
  comments: [],
}
let validateArr = ['cartId', 'priority', 'totalAmount', 'paymentMethod']
function Payment(props) {
  const [order, setOrder] = useState(obj);
  const [selectedAddr, setSelectedAddr] = useState([])
  const [checkOutLevel, setCheckOutLevel] = useState({
    current: 1,
    shipping: false,
    payment: false,
    address: false,
    review: false
  })
  const [cartFlg, setCartFlg] = useState(false)
  useEffect(() => {
    //props.fetchAddresses(Auth.getUserId())
    if (Object.keys(props.cart).length < 1) {
      props.getCartByUserId()
    } else {
      props.getCheckoutUrl(props.cart._id)
    }
  }, [])

  useEffect(() => {
    if (!props.url && Object.keys(props.cart).length > 1) {
      props.getCheckoutUrl(props.cart._id)
    }

    if (Object.keys(props.cart).length > 1) {
      setCartFlg(true)
    }
  }, [props.url, props.cart])


  function toggleCheckout(value) {
    setCheckOutLevel(prevState => {
      prevState.current = value
      return ({ ...prevState })
    })
  }

  function getSelectedAddress(value) {
    setSelectedAddr(value)
    setCheckOutLevel(prevState => {
      prevState.address = true
      return ({ ...prevState })
    })
    setOrder(prevState => {
      prevState.addressId = (value.length > 0) ? value[0]._id : ''
      return ({ ...prevState })
    })
  }
  function getSelectedShipType(value) {
    setOrder(prevState => {
      prevState.priority = value
      return ({ ...prevState })
    })
    setCheckOutLevel(prevState => {
      prevState.shipping = true
      return ({ ...prevState })
    })
    console.log(value)
  }

  function getPaymentType(value) {
    let type = value
    setOrder(prevState => {
      prevState.paymentMethod = type
      return ({ ...prevState })
    })
  }

  useEffect(() => {
    if (!props.order_loading) {
      if (!props.order.toJS().error) {
        console.log(props.order.toJS())
        jumpTo('/success/' + props.order.toJS().data['_id'])
      } else {
        jumpTo('/cancel_page')
      }
    }
  }, [props.order_loading])

  function confirmPayment(type) {
    setOrder(prevState => {
      prevState.userId = Auth.getUserId()
      prevState.cartId = props.cart._id
      prevState.totalAmount = calcPrice(props.cart.totalPrice).total
      return ({ ...prevState })
    })
    //if (type === 'cod') {
    props.confirmOrder(order)
    //}
  }
  return (<div>
    {cartFlg ?
      <div className="jumbotron">
        <div className="container padding-bottom-3x mb-2">
          <h3 className="page-title">Checkout</h3>
          <div className="row">
            {/* <!-- Checkout Adress--> */}
            <div className="col-xl-9 col-lg-8">
              <div className="checkout-steps">
                <a className={(checkOutLevel.current === 4 ? 'active' : '')} onClick={() => toggleCheckout(4)}>&nbsp;4. Payment </a>
                <a className={(checkOutLevel.current === 3 ? 'active' : '')} onClick={() => toggleCheckout(3)} > {(checkOutLevel.current > 3) && <i className="fa fa-check-circle" ></i>}&nbsp; <span className="angle"></span>3. Review</a>
                <a className={(checkOutLevel.current === 2 ? 'active' : '')} onClick={() => toggleCheckout(2)} > {checkOutLevel.shipping && <i className="fa fa-check-circle" ></i>} &nbsp; <span className="angle"></span>2. Shipping</a>
                <a className={(checkOutLevel.current === 1 ? 'active' : '')} onClick={() => toggleCheckout(1)} > {checkOutLevel.address && <i className="fa fa-check-circle" ></i>} &nbsp; <span className="angle"></span>1. Address</a>
              </div>
              <br />
              {checkOutLevel.current === 1 && <Address selectedAddress={getSelectedAddress} />}
              {checkOutLevel.current === 2 && <Shipping selectedShipType={getSelectedShipType} />}
              {checkOutLevel.current === 4 && <PaymentSection selectedPaymentType={getPaymentType} confirmPayment={confirmPayment} />}
              {checkOutLevel.current === 3 && <Review cart={props.cart} />}

              <div className="row padding-top-1x mt-3">
                <div className="col-sm-6">
                  <h5>Shipping to:</h5>
                  {(selectedAddr.length > 0) && <ul className="list-unstyled">
                    <li><span className="text-muted">Client:</span>&nbsp;Daniel Adams</li>
                    <li><span className="text-muted">Address:</span>&nbsp;{selectedAddr[0].address1}, {selectedAddr[0].address2}</li>
                    <li><span className="text-muted"></span>{selectedAddr[0].city}, {selectedAddr[0].state}</li>
                    <li><span className="text-muted">Land Mark:</span>&nbsp;{selectedAddr[0].landMark}</li>
                    <li><span className="text-muted">Phone:</span>&nbsp;{selectedAddr[0].phoneNo}</li>
                  </ul>}
                </div>
                <div className="col-sm-6">
                  <h5>Payment method:</h5>
                  <ul className="list-unstyled">
                    <li><span className="text-muted">{order.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Card'}</span></li>
                  </ul>
                </div>
              </div>
              <div className="d-flex justify-content-between paddin-top-1x mt-4">
                <button className="btn btn-outline-secondary rounded-0">
                  <i className={'fa fa-arrow-left'}></i><span className="hidden-xs-down">&nbsp;Back To Cart</span>
                </button>
                <button className="btn btn-sm btn-primary rounded-0" onClick={() => setCheckOutLevel(prevState => {
                  prevState.current = checkOutLevel.current - 1
                  return ({ ...prevState })
                })} disabled={(checkOutLevel.current === 1)}>
                  <i className={'fa fa-arrow-left'}></i><span className="hidden-xs-down">&nbsp;Prev&nbsp;</span>
                </button>
                {checkOutLevel.current !== 4 && <button className="btn btn-sm btn-primary rounded-0" onClick={() => setCheckOutLevel(prevState => {
                  prevState.current = checkOutLevel.current + 1
                  return ({ ...prevState })
                })}>
                  <span className="hidden-xs-down">Next&nbsp;</span>
                  <i className={'fa fa-arrow-right'}></i>
                </button>}
              </div>
            </div>
            {/* <!-- Sidebar          --> */}
            <div className="col-xl-3 col-lg-4">
              <aside className="sidebar">
                <div className="padding-top-2x hidden-lg-up"></div>
                {/* <!-- Order Summary Widget--> */}
                <OrderSummary subTotal={props.cart} />
              </aside>
            </div>
          </div >
        </div >
      </div > : <div className={'container'}  style={{marginTop:'75px'}}><br/>Your Cart is Empty<br/><br/>
      <button className="btn btn-outline-secondary rounded-0" onClick={() => jumpTo('/dashboard')}>GoBack Shopping</button>&nbsp;<br/><br/><br/></div>}

  </div>
  )
}



const mapStoreToProps = state => ({
  cart: state.cart.cart,
  url: state.checkout.approval_url,
  name: state.token.user_token.user_name,
  order_loading: state.CheckOutReducer.getIn(['order', 'loading'], true),
  order: state.CheckOutReducer.getIn(['order'], Map())
})
const mapDispatchToProps = dispatch => ({
  getCheckoutUrl: (cartId) => dispatch(getCheckoutUrl(cartId)),
  getCartByUserId: () => dispatch(getCartByUserId()),
  fetchAddresses,
  confirmOrder: (order) => dispatch(confirmOrder(order)),

})

export default connect(mapStoreToProps, mapDispatchToProps)(Payment)
