import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function VisitUs(props) {
    const [state, setState] = useState({
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    })
    return (
        <div>
            <div class="jumbotron">
                <div class="container">
                    <h4 class="title">Visit Us at Our Store</h4>
                    <br />
                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <h5 class="center">Address:</h5>
                            <p class="center">15, Mayor Chitibabu Street
					<br /> Triplicane, Chennai 05</p>
                            <h5 class="center">Opening Hours:</h5>
                            <p class="center">
                                Mon-Thu: 10:00am - 7:00pm
					<br /> Friday: 9:00am - 9:00pm
					<br /> Saturday: 9:00am - 5:00pm
					<br /> Sunday: Closed</p>
                        </div>
                        <div class="col-md-4">
                            <div style={{ height: '100%', width: '100%' }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'Ajfr4PZQDQEuJgGWbAD39XbfQsYbc0zrpKY8B2aYzFxfs0h7dkvF-oGJyV0HS-H-' }}
                                    defaultCenter={state.center}
                                    defaultZoom={state.zoom}
                                >
                                    <AnyReactComponent
                                        lat={59.955413}
                                        lng={30.337844}
                                        text="My Marker"
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <h4 class="title">About Us</h4>
                <p class="center">thericemart.com is a Chennai-based online store that caters to our most basic requirement for life – food. We are specialists
                in India’s staple food, in most parts - rice & varieties of rice. Our uniqueness and forte is in our ability to provide
		to you the best quality rice, from our very own mills.</p>
            </div>
        </div>
    )
}

export default VisitUs