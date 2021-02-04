import React, { useState, useEffect } from 'react'

function Shipping(props) {
    const [priority, setPriority] = useState('')
    function onChangeHandle(value) {
        setPriority(value)
        props.selectedShipType(value)
    }


    return (
        <div className="shipping-method" >
            <h4>Choose Shipping Method</h4>
            <hr className="padding-bottom-1x" />
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="thead-default">
                        <tr>
                            <th></th>
                            <th>Shipping method</th>
                            <th>Delivery time</th>
                            <th>Handling fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="align-middle">
                                <div className="custom-control custom-radio mb-0">
                                    <input className="custom-control-input" type="radio" id="high" name="shipping-method" checked={(priority === 'high' ? true : false)} onChange={() => onChangeHandle('high')} />
                                    <label className="custom-control-label" for="high"></label>
                                </div>
                            </td>
                            <td className="align-middle"><span className="text-gray-dark">Immediate</span><br /><span className="text-muted text-sm">Local and within 15kms radius </span></td>
                            <td className="align-middle">1 - 2 days</td>
                            <td className="align-middle">Rs. 100</td>
                        </tr>
                        <tr>
                            <td className="align-middle">
                                <div className="custom-control custom-radio mb-0">
                                    <input className="custom-control-input" type="radio" id="medium" name="shipping-method" checked={(priority === 'medium' ? true : false)} onChange={() => onChangeHandle('medium')} />
                                    <label className="custom-control-label" for="medium"></label>
                                </div>
                            </td>
                            <td className="align-middle"><span className="text-gray-dark">Priority Medium</span><br /><span className="text-muted text-sm">Local and within 15kms radius </span></td>
                            <td className="align-middle">3 - 4 days</td>
                            <td className="align-middle">Rs. 50</td>
                        </tr>
                        <tr>
                            <td className="align-middle">
                                <div className="custom-control custom-radio mb-0">
                                    <input className="custom-control-input" type="radio" id="low" name="shipping-method" checked={(priority === 'low' ? true : false)} onChange={() => onChangeHandle('low')} />
                                    <label className="custom-control-label" for="low"></label>
                                </div>
                            </td>
                            <td className="align-middle"><span className="text-gray-dark">Priority Low</span><br /><span className="text-muted text-sm">Local and within 15kms radius </span></td>
                            <td className="align-middle">5 - 7 days</td>
                            <td className="align-middle">Rs. 25</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Shipping
