import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import Select from "react-select";
import { Redirect } from "react-router-dom";

import NetClient from "../Utils/NetClient";
import UserController from "../Controllers/UserController";

// FOR POST:
//  BeerName, StyleId

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBeerData: {
        name: "",
        selectedStyle: null
      }
    };
  }

  componentDidMount() {
    NetClient.get("https://localhost:44300/api/BeerStyles").then(data => {
      const styles = data.map(d => {
        return {
          value: d.Id,
          label: d.Style
        };
      });

      this.setState({
        allStyles: styles
      });
    });
  }

  _validateAddBeerForm() {
    return (
      this.state.addBeerData.name.length > 0 &&
      this.state.addBeerData.selectedStyle
    );
  }

  _validateRemoveBeer() {
    return true;
  }

  _handleAddBeerSubmit = async event => {
    event.preventDefault();
    //UserController.addBeer(this.state.addBeerData);
    NetClient.post("https://localhost:44300/api/Beers", {
      Id: this.state.addBeerData.selectedStyle,
      BeerName: this.state.addBeerData.name.length
    });
  };

  _handleRemoveBeerSubmit = async event => {
    event.preventDefault();
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
    if (UserController.isBusiness) {
      return <h2>{UserController.businessName}</h2>;
    }
    return null;
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

  _renderButton(variant, disabled, onClick, text) {
    return (
      <Button
        type="submit"
        variant={variant}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </Button>
    );
  }

  _renderAddBeerNameField() {
    return (
      <>
        <Form.Label>Name of Beer</Form.Label>
        {this._renderControl("name", "Corona", false, e => {
          const newBeerData = this.state.addBeerData;
          newBeerData.name = e.target.value;
          this.setState({
            addBeerData: newBeerData
          });
        })}
      </>
    );
  }

  _renderAddBeerDropdown() {
    return (
      <>
        <Form>
          <Form.Label>Style</Form.Label>
        </Form>
        <Select
          options={this.state.allStyles}
          onChange={event =>
            this.setState({
              addBeerData: {
                name: this.state.addBeerData.name,
                selectedStyle: event.value
              }
            })
          }
        />{" "}
      </>
    );
  }

  _renderAddBeer() {
    return (
      <Form.Group as={Col} controlId="formGridFirstName">
        <h2>Add a Beer</h2>
        <hr />
        <Form.Row>
          <Form.Group as={Col} controlId="formGridBeerName">
            {this._renderAddBeerNameField()}
          </Form.Group>
        </Form.Row>
        {this._renderAddBeerDropdown()}
        <hr />
        <Form.Row>
          {this._renderButton(
            "primary",
            !this._validateAddBeerForm(),
            this._handleAddBeerSubmit,
            "Add Beer"
          )}
        </Form.Row>
      </Form.Group>
    );
  }

  _renderRemoveBeer() {
    return (
      <Form.Group as={Col} controlId="formGridLastName">
        <h2>Remove a Beer</h2>
        <hr />
        <Form.Label>Name of Beer</Form.Label>
        <Select
          options={this.state.allStyles}
          onChange={event =>
            this.setState({
              addBeerData: {
                name: this.state.addBeerData.name,
                selectedStyle: event.value
              }
            })
          }
        />
        <hr />
        {this._renderButton(
          "danger",
          !this._validateRemoveBeer(),
          this._handleRemoveBeerSubmit,
          "Remove Beer"
        )}
      </Form.Group>
    );
  }

  _renderAddRemove() {
    if (!UserController.isBusiness) {
      return null;
    }

    return (
      <Form.Group as={Col} controlId="formGridFirstName">
        <Form onSubmit={this._handleCreateAccountSubmit}>
          <Form.Row>
            {this._renderAddBeer()}
            <div />
            {this._renderRemoveBeer()}
          </Form.Row>
        </Form>
      </Form.Group>
    );
  }

  render() {
    if (UserController.getCurrentUser()) {
      return (
        <div className="Login" style={broadStyle}>
          <Form>
            {this._renderBusinessName()}
            {this._renderCommon()}
            {this._renderAddRemove()}
          </Form>
        </div>
      );
    }
    return <Redirect to="/account-entry" />;
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
