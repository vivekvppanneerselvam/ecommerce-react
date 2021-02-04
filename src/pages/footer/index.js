import React, { useState } from 'react'
import './footer.css'
import paymentMethod from '../../assets/images/payment_methods.png'
import { submitNewletter } from './action'

function Footer(props) {
    const [mail, setMail] = useState('')

    function onClickSubmitSubscription() {
        submitNewletter({ mail: mail }).then(data => {
            alert(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        {/* <!-- Contact Info--> */}
                        <section className="widget widget-light-skin">
                            <h3 className="widget-title">Get In Touch With Us</h3>
                            <p className="text-white">Phone: 00 33 169 7720</p>
                            <ul className="list-unstyled text-sm text-white">
                                <li><span className="opacity-50">Monday-Friday:</span>9.00 am - 8.00 pm</li>
                                <li><span className="opacity-50">Saturday:</span>10.00 am - 6.00 pm</li>
                            </ul>
                            <p className="store-mail"><a className="navi-link-light" href="#">thewholesalericemerchant@gmail.com</a></p>
                            <a className="social-button shape-circle sb-facebook sb-light-skin" href="#"><i className="fa fa-facebook "></i></a>
                            <a className="social-button shape-circle sb-twitter sb-light-skin" href="#"> <i className="fa fa-twitter sm-icon"></i></a>
                            <a className="social-button shape-circle sb-instagram sb-light-skin" href="#"><i className="fa fa-instagram sm-icon"></i></a>

                        </section>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        {/* <!-- Mobile App Buttons--> */}
                        <section className="widget widget-light-skin">
                            <h3 className="widget-title">Our Mobile App</h3>
                            {/* <!-- <a className="market-button apple-button mb-light-skin" href="#"><span className="mb-subtitle">Download on the</span><span className="mb-title">App Store</span></a> --> */}
                            <a className="market-button google-button mb-light-skin" href="#"><span className="mb-subtitle">Download on the</span><span className="mb-title">Google Play</span></a>
                            {/* <!-- <a className="market-button windows-button mb-light-skin" href="#"><span className="mb-subtitle">Download on the</span><span className="mb-title">Windows Store</span></a> --> */}
                        </section>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        {/* <!-- About Us--> */}
                        <section className="widget widget-links widget-light-skin">
                            <h3 className="widget-title">About Us</h3>
                            <ul>
                                <li><a href="/not-found">Careers</a></li>
                                <li><a href="/visitus">About The Rice Mart</a></li>
                                <li><a href="/visitus">Our Story</a></li>
                                <li><a href="/visitus">Services</a></li>
                                <li><a href="/blog">Our Blog</a></li>
                            </ul>
                        </section>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        {/* <!-- Account / Shipping Info--> */}
                        <section className="widget widget-links widget-light-skin">
                            <h3 className="widget-title">Account &amp; Shipping Info</h3>
                            <ul>
                                <li><a href="/profile-page">Your Account</a></li>
                                <li><a href="/faq">Shipping Rates &amp; Policies</a></li>
                                <li><a href="/faq">Refunds &amp; Replacements</a></li>
                                <li><a href="/faq">Taxes</a></li>
                                <li><a href="/faq">Delivery Info</a></li>
                                <li><a href="/not-found">Affiliate Program</a></li>
                            </ul>
                        </section>
                    </div>
                </div>
                <hr className="hr-light mt-2 margin-bottom-2x" />
                <div className="row">
                    <div className="col-md-6 padding-bottom-1x">
                        {/* <!-- Payment Methods--> */}
                        <div className="margin-bottom-1x"><img className={'img'} src={paymentMethod} alt="Payment Methods" /></div>
                    </div>
                    <div className="col-md-1 padding-bottom-1x">
                        {/* <!-- Payment Methods--> */}
                        {/* <div className="margin-bottom-1x"><img src="../../assets/img/paytm-512.png" alt="Payment Methods Paytm" /></div> */}
                    </div>

                    <div className="col-md-5 padding-bottom-1x">
                        {/* <!--Subscription--> */}
                        <div className="subscribe-form" novalidate="">
                            <div className="row">
                                <div className="input-group input-light col-md-10">
                                    <input className="form-control rounded-0" type="email" name="EMAIL" value={mail} placeholder="Your e-mail" onChange={(e) => setMail(e.target.value)} />
                                    <span className="input-group-addon" onClick={submitNewletter}><i className="fa fa-check"></i></span>
                                </div>
                            </div><span className="form-text text-sm opacity-50">Subscribe to our Newsletter to receive early discount offers, latest news, sales and promo information.</span>
                        </div>
                    </div>
                </div>
                {/* <!-- Copyright--> */}
                <p className="footer-copyright">© All rights reserved. </p>
            </div>
        </footer>

    )
}

export default Footer