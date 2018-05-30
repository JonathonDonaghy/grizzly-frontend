import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      catname: "",
      description: ""
    };

    this.onToggle = this.onToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    // Do stuff here

    this.onToggle();
  }

  render() {
    return (
      <div className="form-group mb-0">
        <input
          type="button"
          value="Add Category"
          className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
          onClick={this.onToggle}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.onToggle}>Add Category</ModalHeader>
          <ModalBody>
            <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-sm text-right flex-grow-04">
                  <text>Category Name</text>
              </div>
                <div className="col-md">
                  <TextFieldGroup
                    placeholder="Category Name"
                    name="catname"
                    type="catname"
                    value={this.state.catname}
                    onChange={this.onChange}
                  />
                </div>
            </div>
            <div className="row">
              <div className="col-sm text-right flex-grow-04">
                  <text>Category Description</text>
              </div>
                <div className="col-md">
              <TextAreaFieldGroup
                placeholder="Category Description"
                name="description"
                type="description"
                value={this.state.description}
                onChange={this.onChange}
              />
              </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <div>
              <Button
                className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-3"
                onClick={this.onSubmit}
              >
                Done
              </Button>

              <Button
                className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
                onClick={this.onToggle}
              >
                Cancel
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(CategoryForm));
