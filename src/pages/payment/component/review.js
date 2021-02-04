import React, { useState, useEffect } from 'react'

function Review(props) {

    useEffect(() => {

    }, [])



    function getItems() {
        if (Object.keys(props.cart).length > 0) {
           return Object.keys(props.cart.items).map((i) => {
                return <tr>
                    <td>
                        <div className="product-item"><a className="product-thumb"><img src={props.cart.items[i].item.imagePath} alt="Product" width="75" height="75" /></a>
                            <div className="product-info">
                                <h4 className="product-title"><a>{''}<small>{props.cart.items[i].item.title}</small></a></h4>
                                <span><em>Size:</em>{props.cart.items[i].item.size}</span>
                                <span><em>Color:</em>{props.cart.items[i].item.color}</span>
                            </div>
                        </div>
                    </td>
                    <td className="text-center text-lg text-medium quant-input">
                        <h5>
                            {props.cart.items[i].item.price} X {props.cart.items[i].qty}
                        </h5>
                    </td>
                    <td className="text-center text-lg text-medium">Rs {props.cart.items[i].item.price * props.cart.items[i].qty}</td>
                </tr>
            })
        }
        
    }

    return (
        <div className="review" >
            <h4>Review</h4>
            <hr className="padding-bottom-1x" />
            <div className="table-responsive shopping-cart">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th className="text-center">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getItems()}
                    </tbody>
                </table>
            </div>
            <div className="shopping-cart-footer">
                <div className="column"></div>
                <div className="column text-lg">Subtotal: <span className="text-medium">{props.cart.totalPrice}</span></div>
            </div>
        </div>

    )
}

export default Review