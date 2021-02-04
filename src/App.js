import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { registerNav } from './modules/Navigation'
import { insertToken } from './redux/action/tokenAction'
import LoginContainer from './pages/loginsignin/LoginContainer'
import SigninContainer from './pages/loginsignin/SigninContainer'
import DashboardContainer from './pages/dashboard/DashboardContainer'
import ProductOverview from './pages/productOverview/ProductOverviewContainer'
import ShoppingBagContainer from './pages/shoppingBag/ShoppingBagContainer'
import CheckoutContainer from './pages/checkout/checkoutContainer'
import CheckoutSuccessContainer from './pages/checkoutSuccess/CheckoutSuccessContainer'
import CheckoutCancel from './pages/checkoutCancel/CheckoutCancel'
import Payment from './pages/payment'
import OrderHistory from './pages/orderhistory'
import TrackOrders from './pages/trackorders'
import Track from './pages/trackorders/track'
import Order from './pages/trackorders/order'
import HeaderContainer from './components/header/headerContainer'
import Footer from './pages/footer'
import Admin from './pages/admin'
import FAQ from './pages/faq'
import Reset from './pages/loginsignin/Reset'
import VisitUs from './pages/visitus'
import Success from './pages/payment/success'
import ForgetPassword from './pages/loginsignin/ForgotPassword'

class App extends Component {
  componentDidMount() {
    this.props.insertToken()
  }
  render() {
    return (
      <div>
        <HeaderContainer />
        <Router ref={registerNav}>
          <Switch>
            <Route path="/register" component={SigninContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/forgotpassword" component={ForgetPassword} />
            <Route key="productOverview" path="/product-overview" component={ProductOverview} />,
            {this.props.token && [
              <Route key="track" path="/track/:id" component={Track} />,
              <Route key="orders" path="/orders" component={TrackOrders} />,
              <Route key="order" path="/order/:id" component={Order} />,
              <Route key="history" path="/history" component={OrderHistory} />,
              <Route key="ShoppingBagContainer" path="/bag" component={ShoppingBagContainer} />,
              <Route key="Checkout" path="/checkout" component={CheckoutContainer} />,
              <Route key="success" path="/success_page" component={CheckoutSuccessContainer} />,
              <Route key="confirm" path="/success/:id" component={Success} />,
              <Route key="cancel" path="/cancel_page" component={CheckoutCancel} />,
              <Route path='/payment' component={Payment} />
            ]}
            <Route key="dashboard" path="/dashboard" component={DashboardContainer} />,
            <Route exact path="/" component={DashboardContainer} />
            <Route path='/admin' component={Admin} />
            <Route path='/faq' component={FAQ} />
            <Route path='/reset/:token' component={Reset} />
            <Route path='/visitus' component={VisitUs}/>
            <Redirect to='/login' />

          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}
const mapStoreToProps = state => ({
  token: state.token.user_token
})
const mapDispatchToProps = {
  insertToken
}
export default connect(mapStoreToProps, mapDispatchToProps)(App);
