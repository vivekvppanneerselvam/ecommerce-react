import React, { Component } from 'react'
import styles from './stylesheets/header.module.sass'
import UserHeader from './components/UserHeader'
import Menu from './components/Menu'
import Search from './components/Search'
import jumpTo, { go } from '../../modules/Navigation'
import Auth from '../../modules/Auth'
import { getCartByUserId } from '../../redux/action/cartAction'
import { connect } from 'react-redux'

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      isToggle: false,
      toggleSearch: false
    }
  }

  componentDidMount() {
    //this.props.getCartByUserId()
  }
  handleChange = (v) => {
    this.setState({
      input: v
    })
  }
  handleSuggest = (v) => {
    this.setState({
      input: v
    })
  }
  handleToggle = () => {
    this.setState(prevState => {
      return {
        isToggle: !prevState.isToggle
      }
    })
  }
  handleToggleSearch = () => {
    this.setState(prevState => {
      return {
        toggleSearch: !prevState.toggleSearch
      }
    })
  }
  closeToggle = () => {
    this.setState({
      isToggle: false
    })
  }
  render() {
    const { user_token, departments, search, getProductsByCategory, getAllProducts } = this.props
    let visibility = "hide"
    if (this.state.isToggle) {
      visibility = "show"
    }
    return (

      <div className={styles.outbox} >
        {/*  <div className="topbar" >
          <div className="topbar-column"><a className="hidden-md-down" href="mailto:support@thericemart.com">
            <i className={'fa fa-i-mail '}></i> &nbsp; support@thericemart.com</a>
            <a className="hidden-md-down hidden-on-mobile" href="tel:00331697720">
              <i className={'fa fa-i-bell'}></i> &nbsp; 00 33 169 7720 </a>
            <a className="social-button sb-facebook shape-none sb-dark hidden-on-mobile" href="#" target="_blank"><i-facebook className="icon-x-sm"></i-facebook></a>
            <a className="social-button sb-twitter shape-none sb-dark hidden-on-mobile" href="#" target="_blank"><i-twitter className="icon-x-sm"></i-twitter></a>
            <a className="social-button sb-instagram shape-none sb-dark hidden-on-mobile" href="#" target="_blank"><i-instagram className="icon-x-sm" ></i-instagram></a>
            <a className="social-button sb-pinterest shape-none sb-dark hidden-on-mobile" href="#" target="_blank"><i className="socicon-pinterest"></i></a>
          </div>
          <div className="topbar-column"><a className="hidden-md-down" href="#"><i className="fa fa-download icon-x-sm"></i>&nbsp; Get mobile app</a>
          </div>
        </div> */}
        <header>
          <div className="container">
            <button class="navbar-toggler" type="button" data-toggle="offcanvas" data-target="#navbar_main" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={this.handleToggle}>
              <span class="fa fa-bars"></span>
            </button>
            <div className="brand">
              <img className="logo" src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png" alt="Veggy Brand Logo" /></div>
            <div className="search">
              <a className="mobile-search" href="#" onClick={this.handleToggleSearch}>
                <img src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png" alt="search" /></a>
              <div className={"search-form " + (this.state.toggleSearch ? 'active' : '')}>
                <a className="back-button" href="#" onClick={this.handleToggleSearch}>
                  <img src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png" alt="back" />
                </a>
                <Search search={search} onChange={this.handleChange} input_value={this.state.input} handleSuggest={this.handleSuggest} />
                {/*  <a className="back-button" href="#" onClick={this.handleToggleSearch}>
                  <img src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png" alt="back" />
                </a>
                <input type="search" placeholder="Search for Products" className="search-keyword" />
                <button className="search-button" type="submit" ></button> */}
              </div>
            </div><div className="cart">
              <div className="cart-info"><table><tbody><tr><td>No. of items</td><td>:</td><td><strong>{this.props.cart.totalQty}</strong></td>
              </tr><tr><td>Sub Total</td><td>:</td><td><strong>{this.props.cart.totalPrice}</strong></td></tr></tbody></table>
              </div>
              <a className="cart-icon" onClick={() => jumpTo('/bag')}>
                <img className=" " src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png" alt="Cart" /></a>
              <div className="cart-preview"><div style={{ position: 'relative', overflow: 'hidden', width: '360px', height: '320px' }}>
                <div style={{ position: 'absolute', inset: '0px', overflow: 'scroll', marginRight: '-17px', marginBottom: '-17px' }}>
                  <div className="empty-cart"><img src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png" alt="empty-cart" />
                    <h2>You cart is empty!</h2></div></div>
                <div style={{ position: 'absolute', height: '6px', right: '2px', bottom: '2px', left: '2px', borderRadius: '3px' }}>
                  <div style={{ position: 'relative', display: 'block', height: '100%', cursor: 'pointer', borderRadius: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></div>
                </div>
                <div style={{ position: 'absolute', width: '6px', right: '2px', bottom: '2px', top: '2px', borderRadius: '3px' }}>
                  <div style={{ position: 'relative', display: 'block', width: '100%', cursor: 'pointer', borderRadius: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></div>
                </div></div>
                <div className="action-block"><button type="button" className="disabled">PROCEED TO CHECKOUT</button>
                </div>
              </div>&nbsp;
              {(user_token && Object.keys(user_token).length > 0)
                ?
                <ul style={{ margin: 0 }}>
                  <li class="nav-item dropdown" >
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{`hello, ${user_token.user_name}`}</a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href='/orders'>Track Orders</a>
                      <a className="dropdown-item" href='/history'>Order History</a>
                      <div class="dropdown-divider"></div>
                      <a className="dropdown-item" onClick={Auth.logout} href='/'>Logout</a>
                    </div>
                  </li>
                </ul>
                :
                <button className={'btn btn-primary btn-sm rounded-0'} onClick={() => jumpTo('/login')}>Login</button>}
            </div>
          </div>

          <b className={"screen-overlay " + (this.state.isToggle ? 'show' : '')}></b>
          <nav id="navbar_main" className={"mobile-offcanvas navbar navbar-expand-lg navbar-dark bg-primary " + (this.state.isToggle ? 'show' : '')}>
            <div className="offcanvas-header">
              <button className="btn btn-danger btn-close float-right rounded-0" onClick={this.closeToggle}> &times;</button>
              <h5 className="py-2 text-white">Main navbar</h5>
            </div>
            <Menu departments={departments} getProductsByCategory={getProductsByCategory} getAllProducts={getAllProducts} />
          </nav>
        </header>



        {/* larger than 768px */}

        {/* smaller than 768px */}

      </div >
    )
  }
}

const mapPropsToState = (state) => {
  return {
    cart: state.cart.cart
  }
}
const mapDispatchToProps = dispatch => ({
  getCartByUserId: () => dispatch(getCartByUserId())
})
export default connect(mapPropsToState, mapDispatchToProps)(Header)

// <MediaQuery query={device.min.tablet}>
//           {/* top user header */}
//           <div className={styles.user_header}>
//             <UserHeader user_token={user_token} />
//           </div>
//           {/* menu header */}
//           <div className={styles.content}>
//             <div className={styles.left}>
//               {/* logo */}
//               <div className={styles.logo} onClick={() => { getAllProducts(); jumpTo('/dashboard'); }}> Zack Market </div>
//             </div>
//             <div className={styles.mid}>
//               <Menu departments={departments} getProductsByCategory={getProductsByCategory} getAllProducts={getAllProducts} />
//             </div>
//             <div className={styles.right}>
//               <Search search={search} onChange={this.handleChange} input_value={this.state.input} handleSuggest={this.handleSuggest} />
//             </div>
//           </div>
//         </MediaQuery>



{/* <MediaQuery query={device.max.tablet}>
  <div className={styles.content}>
    <div className={`${styles.toggle_outbox}`}>
      <div id="toggle" className={styles[`${visibility}`]}>
        <div className={styles.toggle_content}>
          <div className={styles.side_title}> MENU
                    <div className={styles.side_title_close} onClick={this.closeToggle} > x </div>
          </div>
          <Search search={search} onChange={this.handleChange} input_value={this.state.input} handleSuggest={this.handleSuggest} />
          <div className={styles.side_title}> CATEGORY </div>
          <Menu departments={departments} getProductsByCategory={getProductsByCategory} getAllProducts={getAllProducts} />
          <div className={styles.side_title}> CART </div>
          <div className={styles.side_content} onClick={() => jumpTo('/bag')} > Shopping Bag </div>
          <div className={styles.side_title}> USER </div>
          <div className={styles.side_content} onClick={() => jumpTo('/orders')} > Track Orders </div>
          <div className={styles.side_content} onClick={() => jumpTo('/history')} > Order History </div>
          <div className={styles.side_content} onClick={() => jumpTo('/login')} > Login </div>
          <div className={styles.side_content} onClick={() => { Auth.logout(); go('/dashboard') }}> Logout </div>
        </div>
      </div>
    
      <div className={`${styles.toggle_icon} ${styles[`${visibility}`]}`} onClick={this.handleToggle}>
        <div className={styles.bar1}></div>
        <div className={styles.bar2}></div>
        <div className={styles.bar3}></div>
      </div>
    </div>
    
    <div className={styles.logo} onClick={() => { getAllProducts(); jumpTo('/dashboard') }}> Zack Market</div>
  </div>
</MediaQuery> */}