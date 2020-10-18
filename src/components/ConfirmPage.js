import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFinalMessage } from '../actions/userData';
import TicketReservationSystemBackendApi from '../api/TicketReservationSystemBackendApi';

/**
 * Component responsible for reservation confirmation.
 */
class ConfirmPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        selectedEvent: {},
        selectedSector: '',
        selectedPlaces: [],
        personalData: {}
    };
  }

  componentDidMount() {
    TicketReservationSystemBackendApi.getReservationData()
        .then(reservationData => {
            this.setState({
                ...this.state,
                selectedEvent: this.props.userData.event,
                selectedSector: reservationData.sector,
                selectedPlaces: reservationData.places,
                personalData: this.props.userData.personalData
            });
        })
  }

  confirmReservation() {
      TicketReservationSystemBackendApi.confirmReservation()
          .then(data => this.props.dispatch(addFinalMessage(data)));
  }

  render() {
    return (
        <div className="container-fluid text-center">
          <div className="row header-footer-decorate">
            <h2>Last step</h2>
            <p>If data is correct please confirm reservation</p>
          </div>
          <div className="row">
            <h1>Selected places</h1>
            <h3>Sector: { this.state.selectedSector }</h3>
            <h3>Places:</h3>
            {
                this.state.selectedPlaces && this.state.selectedPlaces.length > 0 ?
                    this.state.selectedPlaces
                        .map(place => <div key={place.row-place.place}>Row: {place.row} Place: {place.place}</div>) : null
            }
            <hr/>
            {
                this.state.personalData !== {} ?
                    <div>
                        <h1>Your data</h1>
                        <h3>First name: { this.state.personalData.firstName }</h3>
                        <h3>Last name: { this.state.personalData.lastName }</h3>
                        <h3>Email address: { this.state.personalData.email }</h3>
                        <hr/>
                    </div> : null
            }
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
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps)(ConfirmPage);
