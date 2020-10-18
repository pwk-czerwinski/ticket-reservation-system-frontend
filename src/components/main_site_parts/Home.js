import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="img-container"/>
        <div className="main-container text-center">
          <div className="main-text center">Simply make<br/><strong>reservation</strong><hr/></div>
          <div className="sub-main-text sub-center">You can choose event then places and book tickets</div>
          <button className="btn-main-page sub2-center" onClick={() => window.location='#events'}>See upcoming events&emsp;>></button>
        </div>
      </div>
    );
  }
}

export default Home;
