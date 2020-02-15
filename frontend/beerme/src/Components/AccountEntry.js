import React, { Component } from "react";
import { Button, ButtonToolbar, Form, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import MainController from "../Controllers/MainController";
import Main from "./Main";

export class AccountEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: MainController.getCurrentUser(),
      createAccountData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      signInData: {
        email: "",
        password: "",
        isCreateAccount: false
      }
    };
  }

  _validateLoginForm() {
    return (
      this.state.signInData.email.length > 0 &&
      this.state.signInData.password.length > 0
    );
  }

  _validateAccountCreationForm() {
    return (
      this.state.createAccountData.confirmPassword.length > 0 &&
      this.state.createAccountData.password.length > 0 &&
      this.state.createAccountData.email.length > 0 &&
      this.state.createAccountData.firstName.length > 0 &&
      this.state.createAccountData.lastName.length > 0
    );
  }

  _handleSignInSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if (
      MainController.login(
        this.state.signInData.email,
        this.state.signInData.password
      )
    ) {
      this.setState({
        signedIn: true
      });
    }
  };

  _handleCreateAccountSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if (
      this.state.createAccountData.password !==
      this.state.createAccountData.confirmPassword
    ) {
      alert("Please make sure your passwords match.");
      return;
    }
  };

  _renderCreateAccount() {
    return (
      <Form onSubmit={this._handleCreateAccountSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Mark"
              onChange={e => {
                const newCreateAccountData = this.state.createAccountData;
                newCreateAccountData.firstName = e.target.value;
                this.setState({
                  createAccountData: newCreateAccountData
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Johnson"
              onChange={e => {
                const newCreateAccountData = this.state.createAccountData;
                newCreateAccountData.lastName = e.target.value;
                this.setState({
                  createAccountData: newCreateAccountData
                });
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={e => {
                const newCreateAccountData = this.state.createAccountData;
                newCreateAccountData.email = e.target.value;
                this.setState({
                  createAccountData: newCreateAccountData
                });
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => {
                const newCreateAccountData = this.state.createAccountData;
                newCreateAccountData.password = e.target.value;
                this.setState({
                  createAccountData: newCreateAccountData
                });
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={e => {
                const newCreateAccountData = this.state.createAccountData;
                newCreateAccountData.confirmPassword = e.target.value;
                this.setState({
                  createAccountData: newCreateAccountData
                });
              }}
            />
          </Form.Group>
        </Form.Row>

        <ButtonToolbar style={{ justifyContent: "space-between" }}>
          <Button
            variant="primary"
            type="submit"
            disabled={!this._validateAccountCreationForm()}
          >
            Submit
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={() => this.setState({ isCreateAccount: false })}
          >
            Already have an account? Log in
          </Button>
        </ButtonToolbar>
      </Form>
    );
  }

  _renderSignIn() {
    return (
      <Form onSubmit={this._handleSignInSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={e => {
              const newSignInData = this.state.signInData;
              newSignInData.email = e.target.value;
              this.setState({
                signInData: newSignInData
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={e => {
              const newSignInData = this.state.signInData;
              newSignInData.password = e.target.value;
              this.setState({
                signInData: newSignInData
              });
            }}
          />
        </Form.Group>
        <ButtonToolbar style={{ justifyContent: "space-between" }}>
          <Button disabled={!this._validateLoginForm()} type="submit">
            Login
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={() => this.setState({ isCreateAccount: true })}
          >
            Don't have an account? Create one
          </Button>
        </ButtonToolbar>
      </Form>
    );
  }

  _renderBody() {
    if (this.state.isCreateAccount) {
      return this._renderCreateAccount();
    }
    return this._renderSignIn();
  }

  render() {
    if (this.state.signedIn) {
      return <Redirect to="/account" />;
    }
    return (
      <div className="Login" style={broadStyle}>
        {this._renderBody()}
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

export default AccountEntry;
