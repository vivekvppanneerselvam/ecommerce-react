import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { insertAddress, updateAddress } from '../action'
import Auth from '../../../modules/Auth';

const obj = {
    address1: '',
    address2: '',
    phoneNo: '',
    city: '',
    state: 'TN',
    pincode: '',
    landMark: '',
    addressType: '',
    defaultStatus: false,
    userId: ''
}

let validateArr = ['address1', 'phoneNo', 'city', 'state', 'pincode', 'landMark', 'addressType']
function AddressForm(props) {
    const [form, setForm] = useState(obj);

    useEffect(() => {
        setForm((prevState) => {
            prevState.userId = Auth.getUserId()
            return ({ ...prevState })
        })

    }, [])

    useEffect(() => {
        if (!props.isCreate) {
            setForm((prevState) => {
                console.log('edit', props.defaults)
                Object.keys(props.defaults[0]).map(key=>{
                    prevState[key] = props.defaults[0][key]
                })
                return ({ ...prevState })
            })
        }
    }, [props.isCreate])

    function onChangeHandler(evt) {
        let id = evt.target.id, value = evt.target.value
        setForm(prevState => {
            prevState[id] = value
            return ({ ...prevState })
        })
    }

    function saveAddressForm() {
        let isValid = validateForm(form)
        if (isValid) {
            (props.isCreate) ? props.insertAddress(form) : props.updateAddress(form)
        } else {
            alert('please fill mandatory fields')
        }
    }

    function validateForm() {
        for (let i = 0; i < validateArr.length; i++) {
            if (!form[validateArr[i]]) {
                return false
            }
        }
        return true
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label for="email">E-mail Address</label>
                        <input className="form-control rounded-0" type="email" id="email" value={''} disabled />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label for="checkout-altphno">Phone No</label>
                        <input className="form-control rounded-0" type="text" id="phoneNo" value={form.phoneNo} onChange={(e) => onChangeHandler(e)} />
                    </div>
                </div>
            </div>
            <div className="row padding-bottom-1x">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label for="address1">Address 1</label>
                        <input className="form-control rounded-0" type="text" id="address1" value={form.address1} onChange={(e) => onChangeHandler(e)} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label for="address2">Address 2</label>
                        <input className="form-control rounded-0" type="text" id="address2" value={form.address2} onChange={(e) => onChangeHandler(e)} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label for="city">City</label>
                        <input className="form-control rounded-0" type="text" id="city" value={form.city} onChange={(e) => onChangeHandler(e)} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label for="state">State</label>
                        <select className="form-control rounded-0" id="state" value={form.state} onChange={(e) => onChangeHandler(e)}>
                            <option value="TN">TN</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label for="pincode">Pin Code</label>
                        <input className="form-control rounded-0" type="text" id="pincode" value={form.pincode} onChange={(e) => onChangeHandler(e)} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label for="landMark">Land Mark</label>
                        <input className="form-control rounded-0" type="text" id="landMark" value={form.landMark} onChange={(e) => onChangeHandler(e)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <div className="custom-control custom-checkbox ">
                        <input className="custom-control-input" type="checkbox" id="defaultType" name="defaultType" onChange={(e) => setForm(prevState => {
                            prevState.defaultType = !form.defaultType
                            return ({ ...prevState })
                        })} checked={(form.defaultType === true)} />
                        <label className="custom-control-label" for="defaultType">Set as Primary Address</label>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-3">Address Type:</div>
                        <div className="col-sm-4">
                            <div className="custom-control custom-radio ">
                                <input className="custom-control-input" type="radio" id="addressType" name="addressType" onChange={(e) => setForm(prevState => {
                                    prevState.addressType = 'home'
                                    return ({ ...prevState })
                                })} checked={(form.addressType === 'home')} />
                                <label className="custom-control-label" for="addressType">Home (All day delivery)</label>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="custom-control custom-radio ">
                                <input className="custom-control-input" type="radio" id="addressType" name="addressType2" onChange={(e) => setForm(prevState => {
                                    prevState.addressType = 'work'
                                    return ({ ...prevState })
                                })} checked={(form.addressType === 'work')} />
                                <label className="custom-control-label" for="addressType2">Work (Delivery between 10 AM - 5 PM)</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className={'btn btn-primary btn-sm rounded-0'} onClick={saveAddressForm}>Save</button>
        </div>
    )
}

const mapPropsToState = (state) => {
    return {

    }
}
export default connect(mapPropsToState, { insertAddress, updateAddress })(AddressForm)