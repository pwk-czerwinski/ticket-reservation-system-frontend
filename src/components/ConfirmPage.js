import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiPath } from '../index';
import { addFinalMessage } from '../actions/userData';
const axios = require('axios');

class ConfirmPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      choosedEvent: {},
      choosedSector: '',
      choosedPlaces: [],
      personalData: {}
    };
  }

  componentWillMount() {
    this.getReservationData();
  }

  render() {
    let personalData = null;

    if (this.state.personalData !== {}) {
      personalData = (
        <div>
          <h1>Your data</h1>
          <h3>First name: { this.state.personalData.firstName }</h3>
          <h3>Last name: { this.state.personalData.lastName }</h3>
          <h3>Email address: { this.state.personalData.email }</h3>
          <hr/>
        </div>
      );
    }

    return (
      <div className="container-fluid text-center">
        <div className="row header-footer-decorate">
          <h2>Last step</h2>
          <p>If data is correct please confirm reservation</p>
        </div>
          <div className="row">
            <h1>Choosed places</h1>
            <h3>Sector: { this.state.choosedSector }</h3>
            <h3>Places:</h3> {this.state.choosedPlaces.map(function(place) {
              return <div key={place.row-place.place}>Row: {place.row} Place: {place.place}</div>;
            })
            }
            <hr/>
            { personalData }
            <div className="row bottom-btn-nav">
              <Link to="/data-form">
                <button className="btn-back">{'<< Back'}</button>
              </Link>
              <Link to="/final">
                <button
                  className="btn-next"
                  onClick={() => this.confirmReservation()}
                >Confirm >></button>
              </Link>
          </div>
        </div>
      </div>
    );
  }

  getReservationData() {
    axios.get(apiPath + '/reservation-data', { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            choosedEvent: this.props.userData.event,
            choosedSector: response.data.sector,
            choosedPlaces: response.data.places,
            personalData: this.props.userData.personalData
          });
        }
      });
  }

  confirmReservation() {
    axios.get(
      apiPath + '/confirm-reservation',
      { withCredentials: true }
    )
    .then(
      (response) => {
        if (response.status === 200) {
          this.props.dispatch(addFinalMessage(response.data));
        }
      }
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps)(ConfirmPage);