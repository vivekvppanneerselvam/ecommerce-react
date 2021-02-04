import React, { Component } from 'react'
import Product from './components/Product'
import LoadingAnimation from '../../components/loadingAnimation'
import Filter from './components/Filter'
import styles from './stylesheets/dashboard.module.sass'
import './stylesheets/dashboard.css'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.products) {
      this.props.getAllProducts()
    }    
  }
  render() {
    const { products, applyFilters } = this.props
    return (
      <div className={styles.outbox}>
        {/* Header */}
        <div className={styles.box}>
          {/* loading animation */}
          {this.props.loading && <LoadingAnimation />}
          {/* filter */}
          <div className={styles.filter}>
            <Filter applyFilters={applyFilters} />
          </div>
          <button class="sidebar-toggle position-left" data-toggle="modal" data-target="#modalShopFilters"><i className="fa fa-layout"></i></button>
          <div class="modal fade show" id="modalShopFilters" >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Shop Filters</h4>
                  <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                  <Filter applyFilters={applyFilters} />
                </div>
              </div>
            </div>
          </div>

          {/* products */}
          <div className={`row ${styles.products}`}>
            {products && products.map(p =>
              <div key={p.title} className={`col-6 col-sm-4 col-md-4 col-lg-3 my-3 ${styles.product}`}
                onClick={() => this.props.history.push(`/product-overview/${p._id}`)}>
                <Product title={p.title} price={`${p.price}`} color={p.color} image={p.imagePath} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}





