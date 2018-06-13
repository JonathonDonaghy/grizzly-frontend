import React, { Component } from "react";
import ImageUploader from "../products/ImageUploader";
import EditableLabel from 'react-inline-editing';
import InlineEdit from 'react-ions/lib/components/InlineEdit';
import Button from 'react-ions/lib/components/Button';
import isEmpty from "../../../validation/is-empty";
import unavailable from '../../../img/unavailable.png';
//import styles from './styles'


class ProductTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.single[0],
        
        }
    }

    state = {
        isEditing: false,
        value:'{this.state.name}'
      }
    
      handleCallback = event => {
        this.setState({ isEditing: false, value: event.target.value })
        console.log("IN handle callback");
      }
    
      buttonCallback = () => {
        this.setState({ isEditing: true })
      }

      showImg() {
        const product = this.props.single[0];
        if (isEmpty(product.imageDTO)) {
          return (
            <img src={unavailable} className="img-responsive" alt="Unavailable" />
          ); 
        } else {
          return (
            <img
              src={product.imageDTO[0].base64Image}
              className="img-responsive"
              alt={product.name}
            />
          );
        }
      }
    
    render() {
        return (
            <div className="container parent-high">
                <div className="row align-items-start">

                    <div className="col pl-0">
                        <div className="productTitle d-inline">
                           {/* <b className="d-inline">{this.state.name}</b><p className="d-inline dscrptnSize-9"> by {this.state.vendor}</p>
                            
                            <EditableLabel text={this.state.name}  className="d-inline" 
                                onFocus={this._handleFocus} 
                                onFocusOut={this._handleFocusOut}
                                onEditDone={this.saveTempName}>                                                       
                            </EditableLabel>
                            <button type="button" className="btn far fa-edit d-inline" 
                            onClick={this.handleClick}></button>*/}

                            <InlineEdit className="d-inline" name='test' value={this.state.product.name} isEditing={this.state.isEditing} 
                            changeCallback={this.handleCallback} /><p className="d-inline dscrptnSize-9"> by {this.state.product.vendor}</p>
                            <Button className="d-inline btn far fa-edit d-inline" onClick={this.buttonCallback} ></Button>
                            
                        </div>
                        <div className="productRating d-inline">
                            <i className="d-inline fas fa-star fa-xs mr-1"/><p className="d-inline dscrptnSize-8">4.7</p>
                        </div>
                    </div>


                </div>
                <div className="row align-items-end mt-3 parent-high">
                    <ImageUploader />
                </div>
                </div>
    
        )}
}

export default ProductTitle;
