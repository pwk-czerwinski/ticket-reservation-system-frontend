import React from 'react';
import { connect } from 'react-redux';
import SectorInfo from './alerts/SectorInfo';
import { chooseSector } from '../actions/userData';

const ChooseSector = (props) => {
  return (
    <div>
      <SectorInfo
        sectorName={props.sectorName}
        message={props.message}
        onClick={(sectorName) => {
          props.dispatch(chooseSector(sectorName));
        }}
      />
    </div>
  );
};

export default connect()(ChooseSector);
