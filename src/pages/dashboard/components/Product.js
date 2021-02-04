import React from 'react'

export default function Product({ title, color, price, image }) {
  return (
   /*  <div className="row"> */
      
        <div className="product-card mb-30">
          <div className="product-badge bg-danger">Sale</div>
          <div className="product-badge bg-secondary border-default text-body">Out of stock</div>
          <a className="product-thumb"> <img src={image} alt="Product" width="200" height="210" /> </a>
          <div className="product-card-body">
            <div className="product-category"><span></span>-<span></span></div>
            <h3 className="product-title"><a>{title}</a>-<span></span>Kg</h3>
            <h4 className="product-price">
              <del ><span>&#8377;</span></del>
              <span><span>&#8377;</span> {price}</span>
            </h4>
          </div>
          <div className="product-button-group">
            <a className="product-button btn-wishlist" >
              <i className="fa fa-heart icon-sm"></i><span>Wishlist</span>
            </a>
            <a className="product-button"> <i className="fa fa-shopping-cart  icon-sm"></i> <span>To Cart</span>
            </a>
          </div>
        </div>
  )
}
