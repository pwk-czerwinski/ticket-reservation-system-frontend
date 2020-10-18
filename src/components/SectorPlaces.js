import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiPath } from '../index';
import { Link } from 'react-router-dom';
import { addChoosedPlaces } from '../actions/userData';
const axios = require('axios');

class SectorPlaces extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sectorName: this.props.userData.sector.name,
      stadiumPlaces: [],
      choosedPlaces: []
    };
  }

  render() {
    let placesView = this.preparePlacesView();

    return (
      <div className="container-fluid center-block">
        <div className="row text-center header-footer-decorate">
          <h1>Sector <strong>{ this.state.sectorName }</strong></h1>
          <p>To book a ticket select the place that interests you</p>
        </div>
        <div className="row text-center places-choosing">
          { placesView }
        </div>
        <div className="row text-center bottom-btn-nav">
          <Link to="/sectors">
            <button className="btn-back">{ '<< Back' }</button>
          </Link>
          <button
            className="btn-next"
            onClick={() => {
              if (this.state.choosedPlaces.length > 0) {
                this.choosePlaces();
                this.props.dispatch(addChoosedPlaces(this.state.choosedPlaces));
                this.props.history.push('/data-form');
              } else {
                alert('To go further please choose places');
              }
            }}>Next step >></button>
        </div>
      </div>
    );
  }

  choosePlaces() {
    axios.post(
      apiPath + '/choose-places',
      {
        'places': this.state.choosedPlaces
      },
      { withCredentials: true }
    );
  }

  componentWillMount() {
    if (this.state.sectorName === '') {
      this.props.history.push('/sectors');
    } else {
      this.getSectorPlaces(this.state.sectorName);
    }
  }

  handleClick(row, place, id) {
    let indexOfObj = this.indexOfObj(this.state.choosedPlaces, { row: row, place: place });

    if (indexOfObj === -1) {
      document.getElementById(id).style.background = '#fcb045';
      this.state.choosedPlaces.push({ row: row, place: place });
    } else {
      document.getElementById(id).style.background='#76b852';
      this.state.choosedPlaces.splice(indexOfObj, 1);
    }
  }

  indexOfObj(arr, el) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].row === el.row && arr[i].place === el.place) {
        return i;
      }
    }
    return -1;
  }

  preparePlacesView() {
    let placesView = this.state.stadiumPlaces.map(function(row) {
      let completeEl = null;
      let rowPlaces = row.places.map(function (place) {
        let placeNumber = place.place;
        let key = row.row + '-' + placeNumber;

        if (place.reserved === null) {
          completeEl = (
            <button
              className="sector-place sector-place-accessible"
              key={ key }
              id ={ key }
              onClick={() => this.handleClick(row.row, placeNumber, key)}>{ placeNumber }
            </button>
          );
        } else {
          completeEl = (
            <button
              className="sector-place sector-place-inaccessible disabled"
              key={ key }>{ placeNumber }
            </button>
          );
        }
        return completeEl;
      }, this);
      return (
        <div
          className="col-xs-12"
          key={ 'row-' + row.row}
        >
          <span className="sector-places-indent">
            { row.row.length === 1 ? '0' + row.row : row.row }
          </span>
          { rowPlaces }
        </div>
      );
    }, this);

    return placesView;
  }

  getSectorPlaces() {
    axios.post(
      apiPath + '/sector-places',
      {
        'sectorName': this.props.userData.sector.name,
        'idEvent': this.props.userData.choosedEvent.id
      },
      { withCredentials: true }
    )
    .then((response) => {
      if (response.status === 200) {
        if (response.data.sector_name !== '') {
          this.setState({
            sectorName: response.data.sector_name,
            stadiumPlaces: response.data.stadium_places
          });
        } else {
          this.props.history.push('/sectors');
        }
      }
    });
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps)(SectorPlaces);
