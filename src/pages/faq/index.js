import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import { submitFAQ } from './action'


function FAQ(props) {
    const [state, setState] = useState({ name: '', email: '', subject: '', category: '', question: '' })

    useEffect(() => {
        if(!props.submit_faq_loading){
            if(!props.submit_faq.toJS().error){

            }
        }
    }, [props.submit_faq_loading])
    
    function onChangeHandler(e) {
        let id = e.target.id, value = e.target.value
        setState(prevState => {
            prevState[id] = value
            return ({ ...prevState })
        })
    }

    function onSubmitHandler() {
        let isValid = validateForm(state)
        if (isValid) {
            props.resetPassword(props.match.params.token, state)
        } else {
            alert('Please verify the password.')
        }
    }

    function validateForm(form) {
        let arr = ['password', 'confirmpassword']
        return true
    }
    return (
        <div><br /><br />
            <div className="jumbotron">
                <div className="container padding-bottom-3x">
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <nav className="list-group">
                                <a className="list-group-item active">Most Popular Questions</a>
                                <a className="list-group-item" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Managing Account</a>
                                <a className="list-group-item" href="#">Working With Dashboard</a>
                                <a className="list-group-item" href="#">Available Payment Methods</a>
                                <a className="list-group-item" href="#">Delivery Information</a>
                                <a className="list-group-item" href="#">Order Tracking Instructions</a>
                                <a className="list-group-item" href="#">Refund Policy</a><a className="list-group-item" href="#">Offers And Discounts</a><a
                                    className="list-group-item" href="#">Reward Points</a><a className="list-group-item" href="#">Affiliate Program</a><a
                                        className="list-group-item" href="#">Service Terms &amp; Conditions</a></nav>
                            <div className="padding-bottom-3x hidden-md-up"></div>
                        </div>

                        <div className="col-lg-9 col-md-8">
                            <div className="accordion" id="accordion" role="tablist">
                                <div className="card">
                                    <div className="card-header" role="tab">
                                        <h6><a href="#collapseOne" data-toggle="collapse" className="collapsed" aria-expanded="false">What payment
                  methods do you accept?</a></h6>
                                    </div>
                                    <div className="collapse" id="collapseOne" data-parent="#accordion" role="tabpanel" >
                                        <div className="card-body">
                                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                                            sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                                            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                  tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, harum. Asperiores mollitia sed
                                            ullam quae blanditiis explicabo, reprehenderit sint rerum, labore, fugit obcaecati laboriosam nulla
                  voluptatem inventore nobis esse nemo.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" role="tab">
                                        <h6><a className="" href="#collapseTwo" data-toggle="collapse" aria-expanded="true">How long will delivery
                  take?</a></h6>
                                    </div>
                                    <div className="collapse show" id="collapseTwo" data-parent="#accordion" role="tabpanel" >
                                        <div className="card-body">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                                        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" role="tab">
                                        <h6><a className="collapsed" href="#collapseThree" data-toggle="collapse">Do you ship internationally?</a></h6>
                                    </div>
                                    <div className="collapse" id="collapseThree" data-parent="#accordion" role="tabpanel">
                                        <div className="card-body">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                                        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" role="tab">
                                        <h6><a className="collapsed" href="#collapseFour" data-toggle="collapse">Do I need an account to place an
                  order?</a></h6>
                                    </div>
                                    <div className="collapse" id="collapseFour" data-parent="#accordion" role="tabpanel">
                                        <div className="card-body">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                                        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" role="tab">
                                        <h6><a className="collapsed" href="#collapseFive" data-toggle="collapse" aria-expanded="false">Do you have
                  discounts for returning customers?</a></h6>
                                    </div>
                                    <div className="collapse" id="collapseFive" data-parent="#accordion" role="tabpanel" >
                                        <div className="card-body">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                                        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" role="tab">
                                        <h6><a className="collapsed" href="#collapseSix" data-toggle="collapse">How can I track my order?</a></h6>
                                    </div>
                                    <div className="collapse" id="collapseSix" data-parent="#accordion" role="tabpanel">
                                        <div className="card-body">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                                        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" role="tab">
                                        <h6><a className="collapsed" href="#collapseSeven" data-toggle="collapse">What are the product refund
                  conditions?</a></h6>
                                    </div>
                                    <div className="collapse" id="collapseSeven" data-parent="#accordion" role="tabpanel">
                                        <div className="card-body">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                                        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>
                                    </div>
                                </div>
                            </div><br />
                            <h3 className="padding-top-2x center">Haven't found the answer? Ask us.</h3>
                            <p className="text-muted mb-30">We normally respond within 2 business days. Most popular questions will appear on
          this page.</p>
                            <div className="row" >
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label for="help_name">Your Name</label>
                                        <input className="form-control rounded-0" type="text" id="name" value={state.name} onChange={(e) => onChangeHandler(e)} required="" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label for="help_email">Your Email</label>
                                        <input className="form-control rounded-0" type="email" id="email" value={state.email} onChange={(e) => onChangeHandler(e)} required="" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label for="help_subject">Subject</label>
                                        <input className="form-control rounded-0" type="text" id="subject" value={state.subject} onChange={(e) => onChangeHandler(e)} required="" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label for="help_category">Category</label>
                                        <select className="form-control rounded-0" id="category" value={state.category} onChange={(e) => onChangeHandler(e)}>
                                            <option value="Account Management">Account Management</option>
                                            <option value="Refund Policy">Refund Policy</option>
                                            <option value="Payment Procedure">Payment Procedure</option>
                                            <option value="Shipping Info">Shipping Info</option>
                                            <option value="Referral Program">Referral Program</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label for="help_question">Question </label>
                                        <textarea className="form-control rounded-0" id="question" value={state.question} onChange={(e) => onChangeHandler(e)} rows="8" required=""></textarea>
                                    </div>
                                </div>
                                <div className="col-12 text-right">
                                    <button className="btn btn-sm btn-primary rounded-0" type="submit" onClick={() => onSubmitHandler()}>Submit Question</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        submit_faq_loading: state.FAQReducer.getIn(['submit_faq', 'loading'], false),
        submit_faq: state.FAQReducer.getIn(['submit_faq'], Map())
    }
}
export default connect(mapStateToProps, { submitFAQ })(FAQ)