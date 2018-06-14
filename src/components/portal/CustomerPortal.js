import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductGridList from './common/ProductGridList';
import PropTypes from 'prop-types';
import { getProducts } from '../../actions/productsActions';
import ProductCarousel from './common/ProductCarousel';

class CustomerPortal extends Component {
  constructor(props) {
    super(props);
    this.props.getProducts('0');
  }

  render() {
    return (
      <div>
        <ProductCarousel />
        <ProductGridList />
      </div>
    );
  }
}
CustomerPortal.propTypes = {
  getProducts: PropTypes.func.isRequired
};

export default connect(
  null,
  { getProducts }
)(CustomerPortal);