import React, { useState, useEffect } from 'react'
import calcPrice from '../../../components/calcPrice'

function OrderSummary(props) {
    return (
        <section className="widget widget-order-summary">
            <h3 className="widget-title">Order Summary</h3>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Cart Subtotal:</td>
                        <td className="text-gray-dark text-medium">Rs. {props.subTotal.totalPrice}</td>
                    </tr>
                    <tr>
                        <td>Shipping:</td>
                        <td className="text-gray-dark text-medium">Free</td>
                    </tr>
                    <tr>
                        <td>Estimated tax:</td>
                        <td className="text-gray-dark text-medium"> Rs. {calcPrice(props.subTotal.totalPrice).taxes}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="text-lg text-medium text-gray-dark"> Rs. {calcPrice(props.subTotal.totalPrice).total}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default OrderSummary

