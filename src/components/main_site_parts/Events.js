import React, { Component } from 'react';
import { apiPath } from '../../index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { chooseEvent } from '../../actions/userData';
const axios = require('axios');

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      choosedEvent: {
        id: '',
        name: '',
        dateOfEvent: ''
      }
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    let liData = [];
    let activeItem = null;
    let items = [];

    if (this.state.events.length > 0) {
      liData.push(<li data-target="#myCarousel" data-slide-to="0" key="0" className="active"/>);
      activeItem = (
        <div className="item active">
          <img
            // src={ this.state.events[0].image_url.replace('localhost', '172.16.16.74') }
            src={ this.state.events[0].image_url.replace('localhost:8888/images/', '18.195.253.178:8888/') }
            alt=""
            onClick={() => {
              this.props.dispatch(chooseEvent({
                choosedEvent: {
                  id: this.state.events[0].id,
                  name: this.state.events[0].name,
                  dateOfEvent: this.state.events[0].date_of_event
                }
              }));
            }}
          />
          <div className="carousel-caption">
            <h3>{ this.state.events[0].name }</h3>
            <p>{ this.state.events[0].date_of_event }</p>
          </div>
        </div>
      );

      for (let i = 1; i < this.state.events.length; i++) {
        liData.push(<li data-target="#myCarousel" data-slide-to={i} key={i}/>);

        let item = (
          <div className="item" key={"item"+i}>
            <img
              // src={ this.state.events[i].image_url.replace('localhost', '172.16.16.74') }
              src={ this.state.events[i].image_url.replace('localhost:8888/images/', '18.195.253.178:8888/') }
              alt=""
              onClick={() => {
                this.props.dispatch(chooseEvent({
                  choosedEvent: {
                    id: this.state.events[i].id,
                    name: this.state.events[i].name,
                    dateOfEvent: this.state.events[i].date_of_event
                  }
                }));
              }}
            />
            <div className="carousel-caption">
              <h3>{ this.state.events[i].name }</h3>
              <p>{ this.state.events[i].date_of_event }</p>
            </div>
          </div>
        );
        items.push(item);
      }
    }

    return (
      <div id="events" className="events text-center">
        <h1>Upcomming events</h1>
        <p>Events which will take place in the near future</p>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">{liData}</ol>
          <Link to="/sectors">
            <div className="carousel-inner">{activeItem}{items}</div>
          </Link>

          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"/>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"/>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }

  getEvents() {
    axios.get(apiPath + '/events', { withCredentials: true })
      .then((response) => {
      if (response.status === 200) {
        this.setState({
          events: response.data.events
        });
      }
    });
  }
}

const mapStateToProps = (state) => {
  return {
    choosedEvent: state.choosedEvent
  }
};

export default connect(mapStateToProps)(Events);
