import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPersonalData } from '../actions/userData';
import TicketReservationSystemBackendApi from '../api/TicketReservationSystemBackendApi';

/**
 * Component responsible for handling personal data form.
 */
class PersonalDataForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row header-footer-decorate">
          <h2>Form</h2>
          <p>Complete below form</p>
        </div>
        <div className="row">
          <div className="form-horizontal places-choosing">
            <div className="form-group">
              <label className="control-label col-xs-4 col-sm-5" htmlFor="firstName">First name:</label>
              <div className="col-xs-8 col-sm-4 col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter first name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-xs-4 col-sm-5" htmlFor="lastName">Last name:</label>
              <div className="col-xs-8 col-sm-4 col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Ender last name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-xs-4 col-sm-5" htmlFor="email">Email:</label>
              <div className="col-xs-8 col-sm-4 col-md-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row bottom-btn-nav">
          <button
            className="btn-back"
            onClick={() => this.props.history.push('/sector-places')}
          >{'<< Back'}</button>
          <button
            className="btn-next"
            onClick={() => {
              TicketReservationSystemBackendApi.addPersonalData(this.state);
              this.props.dispatch(addPersonalData({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
              }));
              this.props.history.push('/confirm-data');
            }}
          >Next step >></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    personalData: {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email }
  };
};

export default connect(mapStateToProps)(PersonalDataForm);
