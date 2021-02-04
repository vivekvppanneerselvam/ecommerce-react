import React from 'react'
import jumpTo from '../../modules/Navigation';

function Success(props) {
    return (
        <div><br/>
            <div className="container padding-bottom-3x mb-2 rounded-0 thank-for-order" style={{marginTop:'75px'}}>
                <div className="card text-center">
                    <div className="card-body padding-top-2x">
                        <h3 className="card-title">Thank you for your order!</h3>
                        <p className="card-text">Your order has been placed and will be processed as soon as possible.</p>
                        <p className="card-text">Make sure you make note of your order number, which is <span className="text-medium">{props.match.params.id}</span></p>
                        <p className="card-text">You will be receiving an email shortly with confirmation of your order.
                         <u>You can now:</u>
                        </p>
                        <div className="padding-top-1x padding-bottom-1x">
                            <button className="btn btn-outline-secondary rounded-0" onClick={() => jumpTo('/dashboard')}>GoBack Shopping</button>&nbsp;
                             <button className="btn btn-outline-primary rounded-0 " onClick={() => jumpTo('/track/'+props.match.params.id)}>
                                <i className="icon-map-pin"></i>&nbsp;Track order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success