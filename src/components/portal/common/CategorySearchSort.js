import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchVendors } from "../../../actions/vendorActions";
import CategoryForm from "../categories/CategoryForm";
class SearchSort extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onSearch(e) {
    e.preventDefault();
    this.props.searchVendors(this.state.search);
    this.setState({ search: "" });
  }

  render() {
    return (
      <div className="btn-group aligned-left mt-2 mb-2">
        <form className="form-inline ml-0 mr-1">
          <div className="search-form-custom">
            <input
              className="form-control left-rounded border-right-0 border"
              type="search"
              name="search"
              placeholder="Search"
              value={this.state.search}
              onChange={this.onChange}
            />
            <span className="input-group-append-more">
              <button
                onClick={this.onSearch}
                className="btn btn-outline-success right-rounded border-left-0 border"
                type="button"
              >
                <i className="fa fa-search" />
              </button>
            </span>
          </div>
        </form>
        <button
          type="button"
          className="btn more-rounded btn-outline-success dropdown-toggle mr-sm-2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort By
        </button>
        <div className="dropdown-menu">
          <button className="dropdown-item" type="button">
            ID
          </button>
          <button className="dropdown-item" type="button">
            Name
          </button>
          <button className="dropdown-item" type="button">
            Location
          </button>
        </div>
        <CategoryForm
                  buttonLabel="Login"
                  title="Login"
                  actionLabel="Login"
                />
      </div>
    );
  }
}

SearchSort.propTypes = {
  searchVendors: PropTypes.func.isRequired,
  vendor: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vendor: state.vendor
});

export default connect(mapStateToProps, { searchVendors })(SearchSort);
