import React, { Component } from 'react';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import unavailable from "../../../img/unavailable.png";
import { Carousel } from "react-responsive-carousel";
import Button from "react-ions/lib/components/Button";

class CustomerProductDescription extends Component {
  onCancel = event => {
    this.props.history.goBack();
  };

  showCarousel() {
    const product = this.props.product;
    if (!isEmpty(product.images)) {
      return product.images.map((img, index) => (
        <img
          key={index}
          src={img.base64Image}
          className="img-responsive"
          alt=""
          style={{ width: '100%' }}
        />
      ));
    } else
      return (
        <img
          src={unavailable}
          className="img-responsive"
          style={{ width: '150px', height: '150px' }}
          alt="Unavailable"
        />
      );
  }

  render() {
    const product = this.props.product;

    return (
      <div className="container containerCustomerProductView">
        <div className="row">
          <div className="col-3 picCustomerDetailedProductCol mx-auto">
            <Carousel>{this.showCarousel()}</Carousel>
          </div>
          <div className="col-2 containerCustomerProductDesc">
            <div className="row">{product.name}</div>
            <div className="row">
              <div className="dscrptnSize-7 mb-5">
                <p>{product.desc}</p>
              </div>
            </div>
            <div className="row CustomerDetailedProductPrice mt-5">
              <p className="mb-0">${product.price}</p>
            </div>
          </div>
          <div className="col mx-auto CustomerDetailedRightCol">
            <div className="row">
              <button className="btn more-rounded btnPincodeCustomer">
                Enter Pincode
              </button>
              <button className="btn more-rounded btnGoCustomer">Go</button>
            </div>
            <div className="row mt-2">
              <button
                type="button"
                className="btn btnOfferVendorsCustomer"
                // data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Vendors (With Offers)
              </button>
              <div className="dropdown-menu">
                <button className="dropdown-item" type="button" />
              </div>
            </div>
            <div className="row mt-3">
              <button className="btn more-rounded btn-sm btnBuyNowCustomer">
                Buy Now
              </button>
            </div>
            <div className="row mt-1">
              <button className="btn more-rounded btn-sm btnCartCustomer">
                Add to Cart
              </button>
            </div>
            <div className="row mt-1">
              <Button
                className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent mt-2"
                onClick={this.onCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerProductDescription;