import React, { useState, Component } from "react";
import {
  Button,
  Form,
  Col,
  ButtonToolbar,
  Dropdown,
  FormControl
} from "react-bootstrap";
import Select from "react-select";

import UserController from "../Controllers/UserController";

// FOR POST:
//  BeerName, StyleId
// Dropdown with Style
// Just 2 fields: Beer Name, Style

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBeerData: {
        name: "",
        styles: "",
        color: ""
      }
    };
  }

  _validateAddBeerForm() {
    return (
      this.state.addBeerData.name.length > 0 &&
      this.state.addBeerData.styles.length > 0 &&
      this.state.addBeerData.color.length > 0
    );
  }

  _handleAddBeerSubmit = async event => {
    event.preventDefault();
    UserController.addBeer(this.state.addBeerData);
  };

  _renderControl(type, value, isDisabled, onChange = () => {}) {
    return (
      <Form.Control
        disabled={isDisabled}
        type={type}
        placeholder={value}
        onChange={onChange}
      />
    );
  }

  _renderBusinessName() {
    return <h2>{UserController.businessName}</h2>;
  }

  _renderCommon() {
    return (
      <Form.Group as={Col} controlId="formGridFirstName">
        <Form onSubmit={this._handleCreateAccountSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              {this._renderControl("name", UserController.firstName, true)}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              {this._renderControl("name", UserController.lastName, true)}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email Address</Form.Label>
              {this._renderControl("email", UserController.email, true)}
            </Form.Group>
          </Form.Row>
        </Form>
      </Form.Group>
    );
  }

  _renderDropdown(title, options) {
    const scaryAnimals = [
      { label: "Alligators", value: 1 },
      { label: "Crocodiles", value: 2 },
      { label: "Sharks", value: 3 },
      { label: "Small crocodiles", value: 4 },
      { label: "Smallest crocodiles", value: 5 },
      { label: "Snakes", value: 6 }
    ];

    return <Select style={{ width: "100%" }} options={scaryAnimals} />;
  }

  _renderAddBeer() {
    if (!UserController.isBusiness) {
      return null;
    }

    // TO BE DELETED
    const scaryAnimals = [
      { label: "Alligators", value: 1 },
      { label: "Crocodiles", value: 2 },
      { label: "Sharks", value: 3 },
      { label: "Small crocodiles", value: 4 },
      { label: "Smallest crocodiles", value: 5 },
      { label: "Snakes", value: 6 }
    ];

    return (
      <React.Fragment>
        <Form as={Col}>
          <h2>Add a Beer!</h2>
          <hr></hr>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridBeerName">
              <Form.Label>Name of Beer</Form.Label>
              {this._renderControl("name", "Corona", false, e => {
                const newBeerData = this.state.addBeerData;
                newBeerData.name = e.target.value;
                this.setState({
                  addBeerData: newBeerData
                });
              })}
            </Form.Group>
          </Form.Row>
        </Form>
        <div style={{ marginLeft: "15px", marginRight: "15px" }}>
          <Form>
            <Form.Label>Style</Form.Label>
          </Form>
          <Select
            style={{ marginLeft: "500px", backgroundColor: "#ff0" }}
            options={this.beerStyles}
          />
          <hr />
          <Button
            type="submit"
            disabled={!this._validateAddBeerForm()}
            onClick={this._handleAddBeerSubmit}
          >
            Add Beer
          </Button>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="Login" style={broadStyle}>
        <Form>
          {UserController.isBusiness ? this._renderBusinessName() : null}
          {this._renderCommon()}
          {this._renderAddBeer()}
        </Form>
      </div>
    );
  }
}

const broadStyle = {
  paddingTop: "50px",
  marginLeft: "100px",
  marginRight: "100px",
  alignItems: "center",
  justifyContent: "center"
};

export default Account;
