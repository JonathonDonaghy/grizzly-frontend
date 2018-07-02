import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomerProductDescription from './CustomerProductDescription';
import ProductCategoryRow from '../common/ProductCategoryRow';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import {
  getProduct,
  getProductImage,
  getProductImages,
  getRandomProducts
} from '../../../actions/productsActions';
import { addToCart, saveCart } from '../../../actions/cartActions';

class CustomerDetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: null,
      id: null
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(single) {
    this.props.addToCart(single);
  }

  componentDidMount() {
    this.loadData(this.props.match.params.productId);
  }

  componentDidUpdate(prevProps, prevState) {
    //initial render without a previous prop change
    if (isEmpty(prevProps)) {
      return false;
    }

    //new route param ?
    if (this.state.id !== this.props.match.params.productId) {
      this.loadData(this.props.match.params.productId);
      this.setState({ id: this.props.match.params.productId });
    }
  }

  loadData(id) {
    let name = '';
    // Only load data again if there is no data present.
    // Saves page load time & useless API calls :)
    if (!isEmpty(this.props.product.products)) {
      // params must be converted to integer.
      const single = this.props.product.products.filter(
        item => item.productId === parseInt(id, 10)
      );
      if (!isEmpty(single)) {
        this.setState({ single: single[0] });
        name = single[0].name;
      } else {
        this.props.getProduct(id);
      }
    } else {
      this.props.getProduct(id);
    }

    let searchTerm = name.split(' ').pop();
    if (!isEmpty(searchTerm)) {
      this.props.getRandomProducts(searchTerm, '0');
    }
  }

  getImages(products) {
    for (let product of products) {
      if (!isEmpty(product.imageDTO) && isEmpty(this.props.product.images[product.productId])) {
        this.props.getProductImage(product.productId, product.imageDTO[0].imgName);
      }
    }
  }

  show() {
    // From state or from props.
    const single = this.state.single || this.props.product.single;
    const { loadingCategories, loadingVendors, product_vendor } = this.props.product;
    if (loadingVendors || loadingCategories) {
      return <Spinner size={'150px'} />;
    } else {
      if (isEmpty(single) || isEmpty(product_vendor)) {
        return <p>The item was not found.</p>;
      }

      const { random_products } = this.props.product;
      // broken?!
      if (!isEmpty(random_products)) {
        //this.props.getRandomProducts(single.name.split(' ').pop(), '0');
      } else {
        this.getImages(random_products);
        if (!isEmpty(single.imageDTO) && isEmpty(this.props.product.images[single.productId])) {
          this.props.getProductImages(single);
        }
        const vendor = this.props.product.product_vendor.filter(
          item => item.vendorId === single.vendorId
        )[0];
        return (
          <div>
            <CustomerProductDescription
              single={single}
              history={this.props.history}
              vendor={vendor}
              addToCart={this.addToCart}
            />
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <ProductCategoryRow />
        {this.show()}
      </div>
    );
  }
}

CustomerDetailedProduct.propTypes = {
  getProduct: PropTypes.func.isRequired,
  getProductImage: PropTypes.func.isRequired,
  getProductImages: PropTypes.func.isRequired,
  getRandomProducts: PropTypes.func.isRequired,

  addToCart: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  {
    getProduct,
    getRandomProducts,
    getProductImage,
    getProductImages,
    addToCart,
    saveCart
  }
)(CustomerDetailedProduct);
