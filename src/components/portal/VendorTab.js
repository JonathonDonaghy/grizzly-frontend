import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import Products from "./products/Products";
import Inventory from "./inventory/Inventory";
import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";

class VendorTab extends Component {
  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
    this.state = {
      activeTab: ""
    };
  }

  onToggle(tab) {
    if (this.state.activeTab !== tab) {
      if (tab === "2") {
        // Load inventory
      } else {
        // Load products
      }

      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <Row>
        <Col>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames(
                    "nav-link hover-w-b btn-outline-success my-2 my-sm-0",
                    {
                      active: this.state.activeTab === "1"
                    }
                  )}
                  onClick={() => {
                    this.onToggle("1");
                  }}
                >
                  PRODUCTS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames(
                    "nav-link hover-w-b btn-outline-success my-2 my-sm-0",
                    {
                      active: this.state.activeTab === "2"
                    }
                  )}
                  onClick={() => {
                    this.onToggle("2");
                  }}
                >
                  INVENTORY
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <Products />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <Inventory />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
    );
  }
}

// VendorTab.propTypes = {
//   getCategories: PropTypes.func.isRequired,
//   getVendors: PropTypes.func.isRequired
// };

export default connect(null)(VendorTab);