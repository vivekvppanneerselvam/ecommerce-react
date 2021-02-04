import React, { useState, useEffect } from 'react'
import Modal from '../../../components/modal'
import AddressForm from './addressform'
import { fetchAddresses } from '../action'
import { connect } from 'react-redux'
import Auth from '../../../modules/Auth'
import { Map, List, set } from 'immutable'

function Address(props) {
  const [modal, setModal] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [selectedAddr, setSelectedAddr] = useState([])
  useEffect(() => {
    props.fetchAddresses(Auth.getUserId())
  }, [])
  useEffect(() => {
    if (!props.addresses_loading) {
      if (!props.addresses.toJS().error) {
        console.log(props.addresses.toJS().data)
        setAddresses(props.addresses.toJS().data)
      }
    }
  }, [props.addresses_loading])
  function closeHandler() {
    setModal(false)
  }
  return (

    <div className="billing-address" >
      <h4>Billing Address</h4>
      <button className="btn btn-sm btn-primary rounded-0" onClick={() => { setModal(true); setIsCreate(true) }}>Add New Address</button>
      <hr className="padding-bottom-1x" />

      {addresses.map(item => <div className="card">
        <div className="card-body">
          <br />
          <div className="container" >
            <div className="row">
              <div className="col-sm-1" style={{ textAlign: 'center' }}>
                <div className="custom-control custom-radio mb-0">
                  <input className="custom-control-input" id="address" name="shipping-address" type="radio" checked={(selectedAddr.length > 0 && (selectedAddr[0]._id === item._id) ? true : false)} />
                  <label className="custom-control-label" for="address"></label>
                </div>
              </div>
              <div className="col-sm-6">
                <ul className="list-unstyled">
                  <li><span className="text-muted">Name:</span></li>
                  <li><span className="text-muted">Address:</span>&nbsp;{item.address1}, {item.address2}</li>
                  <li><span className="text-muted"></span>&nbsp;{item.city}, {item.state}, {item.pincode}</li>
                  <li><span className="text-muted">Land Mark:</span>&nbsp;{item.landMark}</li>
                  <li><span className="text-muted">Phone:</span>&nbsp;{item.phoneNo}</li>
                </ul>
              </div>
              <div className="col-sm-5">
                <button className="btn btn-sm btn-secondary rounded-0" onClick={() => {
                  setModal(true);
                  setIsCreate(false);
                  setSelectedAddr(addresses.filter(filterItem => item.id === filterItem.id))
                }}>Edit</button>
                &nbsp; <button className="btn btn-sm btn-primary rounded-0" onClick={() => {
                  setSelectedAddr(addresses.filter(filterItem => item.id === filterItem.id))
                  props.selectedAddress(addresses.filter(filterItem => item.id === filterItem.id))
                }}>Select & Deliver Here</button>
              </div>

            </div>
          </div>
        </div>
      </div>)}

      {modal && <Modal showModal={modal} handleClose={(e) => { closeHandler() }} title={(isCreate ? 'Add a New Address' : 'Edit Address')} contentStyle={{
        width: '75%',
        height: '70%',
        left: '15%',
        right: '15%',
        top: '15%'
      }}>
        <AddressForm type={''} isCreate={isCreate} defaults={selectedAddr} />
      </Modal>}
    </div>
  )
}

const mapPropsToState = (state) => {
  return {
    addresses: state.CheckOutReducer.getIn(['addresses'], Map),
    addresses_loading: state.CheckOutReducer.getIn(['addresses', 'loading'], true),

  }
}

export default connect(mapPropsToState, { fetchAddresses })(Address)