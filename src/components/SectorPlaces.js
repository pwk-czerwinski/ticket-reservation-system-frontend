import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addSelectedPlaces } from '../actions/userData';
import TicketReservationSystemBackendApi from '../api/TicketReservationSystemBackendApi';

/**
 * Component responsible for handling sector places.
 */
class SectorPlaces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectorName: this.props.userData.sector.name,
      stadiumPlaces: [],
      selectedPlaces: []
    };

    this.goFurther = this.goFurther.bind(this);
  }

  componentDidMount() {
    if (this.state.sectorName === '') {
      this.props.history.push('/sectors');
    } else {
      TicketReservationSystemBackendApi.getSectorPlaces(this.props.userData.sector.name, this.props.userData.selectedEvent.id)
          .then(data => {
            if (data.sector_name !== '') {
              this.setState({
                sectorName: data.sector_name,
                stadiumPlaces: data.stadium_places
              });
            } else {
              this.props.history.push('/sectors');
            }
          });
    }
  }

  goFurther() {
    if (this.state.selectedPlaces.length > 0) {
      TicketReservationSystemBackendApi.choosePlaces(this.state.selectedPlaces);
      this.props.dispatch(addSelectedPlaces(this.state.selectedPlaces));
      this.props.history.push('/data-form');
    } else {
      alert('To go further please choose places');
    }
  }

  handleClick(row, place, id) {
    let indexOfObj = this.indexOfObj(this.state.selectedPlaces, { row: row, place: place });

    if (indexOfObj === -1) {
      document.getElementById(id).style.background = '#fcb045';
      this.state.selectedPlaces.push({ row: row, place: place });
    } else {
      document.getElementById(id).style.background='#76b852';
      this.state.selectedPlaces.splice(indexOfObj, 1);
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

  render() {
    return (
        <div className="container-fluid center-block">
          <div className="row text-center header-footer-decorate">
            <h1>Sector <strong>{ this.state.sectorName }</strong></h1>
            <p>To book a ticket select the place that interests you</p>
          </div>
          <div className="row text-center places-choosing">
            {
              this.state.stadiumPlaces && this.state.stadiumPlaces.length > 0 ? this.preparePlacesView() : null
            }
          </div>
          <div className="row text-center bottom-btn-nav">
            <Link to="/sectors">
              <button className="btn-back">{ '<< Back' }</button>
            </Link>
            <button
                className="btn-next"
                onClick={() => this.goFurther()}>Next step >></button>
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

export default connect(mapStateToProps)(SectorPlaces);
