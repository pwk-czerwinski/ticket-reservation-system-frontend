import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiPath } from '../../index';
const axios = require('axios');

class SectorInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sectorName: props.sectorName
    }
  }

  render() {
    let content = null;

    if (this.props.message === 'choosedSector') {
      content = this.choosedSectorInfo();
    }

    return (
      <div className="row">{ content }</div>
    );
  }

  onClick = (e) => {
    e.preventDefault();

    this.props.onClick({
      name: this.props.sectorName
    });
  };

  choosedSectorInfo() {
    return (
        <div
          className="row text-center header-footer-decorate"
          onClick={ this.onClick }
        >
          <h1>Choosed sector <strong>{ this.props.sectorName }</strong></h1>
          <div className="row">
            <Link to="/">
              <button className="btn-back">{ '<< Back' }</button>
            </Link>
            <Link to="/sector-places">
              <button className="btn-choosed-sector" onClick={() => this.chooseSector()}>Next step >></button>
            </Link>
          </div>
        </div>
    );
  }

  chooseSector() {
    axios.post(
      apiPath + '/choose-sector',
      {
        'sector': this.state.sectorName
      },
      { withCredentials: true }
    )
  }
}

export default SectorInfo;