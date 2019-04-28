import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.phoneInput = React.createRef();
    this.emailInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;

    //Update Client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      phone: this.phoneInput.current.value,
      email: this.emailInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    //update client firestore
    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="card-header">Edit Client</h3>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    ref={this.firstNameInput}
                    minLength="2"
                    required
                    defaultValue={client.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    ref={this.lastNameInput}
                    minLength="2"
                    required
                    defaultValue={client.lastName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    ref={this.emailInput}
                    defaultValue={client.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    ref={this.phoneInput}
                    minLength="10"
                    required
                    defaultValue={client.phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);
