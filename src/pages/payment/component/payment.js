import React, { useState, useEffect } from 'react'
import Captcha from '../../../components/captcha'
function PaymentSection(props) {
    const [state, setState] = useState({ captcha: '0000', paymentMethod: 'cod', captchaInput: '' })

    const changeCaptcha = () => {
        const captcha = '0000' + Math.random() * 10000;
        setState(prevState => {
            prevState.captcha = captcha.slice(-4)
            return ({ ...prevState })
        });
    }

    function confirmOrder(){
        if(state.captcha  === state.captchaInput){
            props.confirmPayment('cod')
        }
    }

    function onChangeInput(evt){
        let value = evt.target.value
        setState(prevState => {
            prevState.captchaInput = value;
            return ({ ...prevState })
        })
    }

    return (
        <div className="payment" >
            <div className="accordion" id="accordion" role="tablist">
                <div className="card">
                    <div className="card-header" role="tab">
                        <div className="custom-control custom-radio ">
                            <input className="custom-control-input" type="radio" id="card" name="paymentMethod"
                                onChange={() => setState(prevState => { prevState.paymentMethod = 'card'; return ({ ...prevState }) })}
                                value="card" checked={(state.paymentMethod == 'card' ? true : false)} />
                            <label className="custom-control-label" for="card">Card Payment</label>
                        </div>
                    </div>
                    <div className={"collapse " + (state.paymentMethod == 'card' ? 'show' : '')} id="paypal" >
                        <div className="card-body">
                            <div className="container">
                                <p>PayPal - the safer, easier way to pay</p>
                                <form className="row" method="post">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control rounded-0" type="email" placeholder="E-mail" required="" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control rounded-0" type="password" placeholder="Password" required="" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <a className="navi-link" href="#">Forgot password?</a>
                                            <button className="btn btn-sm btn-primary rounded-0 margin-top-none" type="submit">Log In</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" role="tab">
                        <div className="custom-control custom-radio ">
                            <input className="custom-control-input" type="radio" id="cod" name="paymentMethod"
                                onChange={() => setState(prevState => { prevState.paymentMethod = 'cod'; return ({ ...prevState }) })}
                                value="cod" checked={(state.paymentMethod == 'cod' ? true : false)} />
                            <label className="custom-control-label" for="cod">Cash on Delivery</label>
                        </div>
                    </div>
                    <div className={"collapse " + (state.paymentMethod == 'cod' ? 'show' : '')} id="cod">
                        <div className="card-body">
                            <div className="container">
                                <br />
                                <div className="row">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Captcha text={state.captcha} onClick={changeCaptcha} />
                                        </div>
                                        <div className="col-md-1">
                                            <button className="btn btn-sm btn-secondary rounded-0" type="submit" onClick={changeCaptcha} >
                                                <i className='fa fa-refresh'></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <input className="form-control rounded-0" type="text" placeholder="Enter Captcha" value={state.captchaInput} onChange={(e) => onChangeInput(e)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-sm btn-secondary rounded-0" type="submit" onClick={confirmOrder} > Confirm Order </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PaymentSection