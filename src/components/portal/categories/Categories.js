import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import CategorySearchSort from "../common/CategorySearchSort";
import {
  getCategories,
  setCategoryUpdated
} from "../../../actions/categoryActions";
import CategoriesList from "./CategoriesList";
import isEmpty from "../../../validation/is-empty";

class Categories extends Component {
  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener("scroll", e => {
      e.preventDefault();
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
          this.refs.myscroll.scrollHeight &&
        !this.props.category.loading
      ) {
        this.loadMore();
      }
    });
  }

  componentDidUpdate() {
    if (this.props.category.updateOnce)
      this.props.setCategoryUpdated();
  }

  shouldComponentUpdate() {
    if (this.props.category.updateOnce || this.props.category.loading)
      return true;

    return false;
  }

  loadMore() {
    if (this.props.category.hasMore) {
      this.props.getCategories(this.props.category.index);
    }
  }

  show() {
    const { categories, loading } = this.props.category;
    if (isEmpty(categories) || loading) {
      return (<Spinner size={'150px'}/>);
    } else {
      return categories.map(category => (
        <CategoriesList key={category.categoryId} category={category} />
      ));
    }
  }

  render() {
    return (
      <div>
        <CategorySearchSort />
        <div ref="myscroll" style={{ height: "500px", overflow: "auto" }}>
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">Category Name</th>
                <th scope="col">Description</th>
                <th scope="col">Products</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{this.show()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  setCategoryUpdated: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(
  mapStateToProps,
  { getCategories, setCategoryUpdated }
)(Categories);
