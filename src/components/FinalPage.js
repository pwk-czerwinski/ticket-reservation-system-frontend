import React, { Component } from 'react';
import { connect } from 'react-redux';

class FinalPage extends Component {

  render() {
    return (
      <div className="container-fluid text-center">
      <div className="row header-footer-decorate">
      <h2>Success</h2>
    <p>The booking went correctly</p>
    </div>
    <div className="row">
      <div
        style={{margin: '150px'}}
      >
        <p>{ this.props.userData.messageAfterReservation }</p>
      </div>
      <div className="row bottom-btn-nav">
          <button
            className="btn-next"
            onClick={() => this.props.history.push('/')}
          >Main site >></button>
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

export default connect(mapStateToProps)(FinalPage);
