import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TicketReservationSystemBackendApi from '../../api/TicketReservationSystemBackendApi';

/**
 * Component responsible for handling sector info.
 */
class SectorInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectorName: props.sectorName
    }
  }

  onClick = (e) => {
    e.preventDefault();

    this.props.onClick({
      name: this.props.sectorName
    });
  }

  render() {
    return (
        this.props.message === 'selectedSector' ?
            <div className="row">
              <div
                  className="row text-center header-footer-decorate"
                  onClick={this.onClick}
              >
                <h1>Selected sector <strong>{ this.props.sectorName }</strong></h1>
                <div className="row">
                  <Link to="/">
                    <button className="btn-back">{ '<< Back' }</button>
                  </Link>
                  <Link to="/sector-places">
                    <button
                        className="btn-selected-sector"
                        onClick={() => TicketReservationSystemBackendApi.chooseSector(this.state.sectorName)}
                    >
                      { 'Next step >>' }
                    </button>
                  </Link>
                </div>
              </div>
            </div> : null
    );
  }
}

export default SectorInfo;
