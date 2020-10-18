import React, { Component } from 'react';
import { apiPath } from '../index';
// import * as Konva from 'konva';
import ChooseSector from './ChooseSector';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const axios = require('axios');

class Sectors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectors: [],
      choosedSectorName: ''
    };
    this.chooseEvent();
    this.getSectors();
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    let screenWidth = window.innerWidth;

    const options = this.state.sectors.map(function (sector) {
      let sectorValue = sector.name + ' - ' + sector.price + ' ZŁ - ' + sector.number_of_free_places + ' wolnych miejsc';
      return <option value={sector.name} key={sector.name}>Sektor {sectorValue}</option>;
    });

    return (
      <div className="container-fluid">
        { this.state.choosedSectorName ?
          <ChooseSector sectorName={ this.state.choosedSectorName } message="choosedSector"/> :
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
            { screenWidth >= 5000 ?
              <div id="stadium-container"/> :
              <div>
                <select className="select-sector" onChange={this.handleChange}>{options}</select>
                {/*<section className="info"><strong>INFORMACJA</strong><br/><br/><section className="info-text-content">W chwili obecnej system rezerwacji biletów uruchomiony został na urządzeniu mobilnym co ze względów technicznych nie umożliwia wyświetlania wizualnego wyglądu położenia sektorów. W związku z tym jedyną opcją wyboru sektora jest powyższe pole wyboru.</section></section>*/}
                <section className="info">
                  <strong>Important note</strong><br/><br/>
                  <section className="info-text-content">
                    Work is underway on the construction of a visual selection of the sector, which is why the selection of the stadium is possible only from the above selection box.
                  </section>
                </section>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      choosedSectorName: e.target.value
    });
  }

  getSectors() {
    // let screenWidth = window.innerWidth;
    axios.post(
      apiPath + '/sectors',
      {
        'eventId': this.props.userData.choosedEvent.id
      },
      { withCredentials: true }
      ).then((response) => {
      if (response.status === 200) {
        this.setState({
          sectors: response.data.sectors
        });
      }
      // if (this.state.sectors !== [] && screenWidth >= 640) {
      //   this.drawStadium();
      // }
    });
  }

  chooseEvent() {
    axios.post(
      apiPath + '/choose-event',
      {
        'choosedEvent': this.props.userData.choosedEvent
      },
      { withCredentials: true }
    )
  }

  // createSector(points) {
  //   let sector = new Konva.Line({
  //     points: points,
  //     fill: '#0074D9',
  //     stroke: 'black',
  //     strokeWidth: 1,
  //     closed : true
  //   });
  //   return sector;
  // }

  // createSectorName(x, y, text) {
  //   let newText = new Konva.Text({
  //     x: x,
  //     y: y,
  //     text: text,
  //     fontSize: 15,
  //     fontFamily: 'Calibri',
  //     fontStyle: 'bold',
  //     fill: 'white'
  //   });
  //   return newText;
  // }
  //
  // changeSectorColor(layer, sector, text) {
  //   let fill = sector.fill() === 'yellow' ? '#0074D9' : 'yellow';
  //   let fillText = text.fill() === 'white' ? 'black' : 'white';
  //   sector.fill(fill);
  //   text.fill(fillText);
  //   layer.draw();
  // }
  //
  // drawSector(layer, sector, text) {
  //   let konvaArr = [];
  //   konvaArr.push(sector);
  //   konvaArr.push(text);
  //
  //   for (let i = 0; i < konvaArr.length; i++) {
  //     konvaArr[i].on('mouseover', () => this.changeSectorColor(layer, sector, text));
  //     konvaArr[i].on('mouseout', () => this.changeSectorColor(layer, sector, text));
  //     konvaArr[i].on('click', () => this.next(text.text()));
  //     konvaArr[i].on('tap', () => this.next(text.text()));
  //   }
  //
  //   layer.add(sector);
  //   layer.add(text);
  // }

  next(sectorName) {
    this.setState({
      choosedSectorName: sectorName
    });
  }

  // drawFootballPitch(layer) {
  //   let screenWidth = window.innerWidth;
  //   let scale = 1;
  //
  //   if (screenWidth <= 360) {
  //     scale = 0.5;
  //   }
  //
  //   let footballPitch = new Konva.Line({
  //     points: [190, 210, 190, 310, 450, 310, 450, 210].map(function (size) {
  //       return size * scale;
  //     }),
  //     fill: 'green',
  //     stroke: 'white',
  //     strokeWidth: 2,
  //     closed : true
  //   });
  //   layer.add(footballPitch);
  // }

  // drawStadium() {
  //   let screenWidth = window.innerWidth;
  //   let scale = 1;
  //
  //   if (screenWidth <= 640) {
  //     scale = 0.5;
  //   }
  //
  //   let stage = new Konva.Stage({
  //     container: 'stadium-container',
  //     width: 640*scale,
  //     height: 510*scale
  //   });
  //
  //   let layer = new Konva.Layer();
  //
  //   let sectorV1 = this.createSector([260, 20, 260, 200, 370, 200, 370, 20].map(function (size) {
  //     return size * scale;
  //   }));
  //   let sectorV2 = this.createSector([260, 320, 260, 500, 370, 500, 370, 320].map(function (size) {
  //     return size * scale;
  //   }));
  //   let sectorA1 = this.createSector([250, 320, 250, 500, 10, 460, 180, 320].map(function (size) {
  //     return size * scale;
  //   }));
  //   let sectorA2 = this.createSector([180, 210, 180, 310, 10, 450, 10, 110].map(function (size) {
  //     return size * scale;
  //   }));
  //   let sectorA3 = this.createSector([250, 20, 250, 200, 180, 200, 10, 100].map(function (size) {
  //     return size * scale;
  //   }));
  //   let sectorA4 = this.createSector([380, 20, 380, 200, 460, 200, 620, 100].map(function (size) {
  //     return size * scale;
  //   }));
  //   let sectorA5 = this.createSector([460, 210, 460, 310, 630, 450, 630, 110].map(function (size) {
  //     return size * scale;
  //   }));
  //   let sectorA6 = this.createSector([380, 320, 460, 320, 620, 455, 380, 500].map(function (size) {
  //     return size * scale;
  //   }));
  //
  //   let count = 0;
  //   let textV1 = this.createSectorName(290*scale, 85*scale, this.state.sectors[count].name);
  //   let textV2 = this.createSectorName(290*scale, 390*scale, this.state.sectors[++count].name);
  //   let textA1 = this.createSectorName(150*scale, 380*scale, this.state.sectors[++count].name);
  //   let textA2 = this.createSectorName(70*scale, 240*scale, this.state.sectors[++count].name);
  //   let textA3 = this.createSectorName(150*scale, 100*scale, this.state.sectors[++count].name);
  //   let textA4 = this.createSectorName(420*scale, 100*scale, this.state.sectors[++count].name);
  //   let textA5 = this.createSectorName(520*scale, 240*scale, this.state.sectors[++count].name);
  //   let textA6 = this.createSectorName(420*scale, 380*scale, this.state.sectors[++count].name);
  //
  //   this.drawSector(layer, sectorV1, textV1);
  //   this.drawSector(layer, sectorV2, textV2);
  //   this.drawSector(layer, sectorA1, textA1);
  //   this.drawSector(layer, sectorA2, textA2);
  //   this.drawSector(layer, sectorA3, textA3);
  //   this.drawSector(layer, sectorA4, textA4);
  //   this.drawSector(layer, sectorA5, textA5);
  //   this.drawSector(layer, sectorA6, textA6);
  //   // this.drawFootballPitch(layer);
  //   stage.add(layer);
  // }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
};

export default connect(mapStateToProps)(Sectors);
