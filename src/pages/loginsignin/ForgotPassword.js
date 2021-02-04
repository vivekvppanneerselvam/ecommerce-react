import React from 'react'
import LoginSignin from './LoginSignin'
import { validateExistence, validateEmail } from './utils/validation'
import { forgotpassword } from '../../redux/action/signinAction'
import { connect } from 'react-redux'

const INPUT_CONFIG = [
    {
        name: "email",
        validations: [validateExistence, validateEmail]
    }
]


function ForgetPassword(props) {
    return (
        <div>
            <LoginSignin
                INPUT_CONFIG={INPUT_CONFIG}
                title="Forgort Password"
                footer_text="Do you have an account?"
                footer_redirect="login"
                footer_text2="Don't you have an account?"
                footer_redirect2="register"
                submitAction={props.forgotpassword}
                loading={props.forgotpwd_loading}
                error={props.forgotpwd_error}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        forgotpwd_loading: state.signin.forgotpwd_loading,
        forgotpwd_error: state.signin.error
    }
}
export default connect(mapStateToProps, { forgotpassword })(ForgetPassword)


