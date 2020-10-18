import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ChooseSector from './ChooseSector';
import StadiumCreator from '../utils/StadiumCreator';
import TicketReservationSystemBackendApi from '../api/TicketReservationSystemBackendApi';

/**
 * Component responsible for handling stadium sectors.
 */
class Sectors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectors: [],
      selectedSectorName: ''
    };

    this.goFurther = this.goFurther.bind(this);
  }

  componentDidMount() {
    TicketReservationSystemBackendApi.chooseEvent(this.props.userData.selectedEvent);
    TicketReservationSystemBackendApi.getSectors(this.props.userData.selectedEvent.id)
        .then(sectors => {
          this.setState({
            ...this.state,
            sectors: sectors
          });

          StadiumCreator.drawStadium(sectors, this.goFurther);
        });
  }

  goFurther(sectorName) {
    this.setState({
      selectedSectorName: sectorName
    });
  }

  render() {
    return (
        <div className="container-fluid">
          {
            this.state.selectedSectorName ? <ChooseSector sectorName={ this.state.selectedSectorName } message="selectedSector"/> :
                <div className="row text-center header-footer-decorate">
                  <h1>Stadium</h1>
                  <p>Choose sector or</p>
                  <Link to="/">
                    <button className="btn-back">{ '<< Back' }</button>
                  </Link>
                </div>
          }
          <div className="row">
            <div className="col-xs-12">
              <div id="stadium-container" />
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
};

export default connect(mapStateToProps)(Sectors);
