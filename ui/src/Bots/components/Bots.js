import React from "react";
import { connect } from 'react-redux';
import './Bots.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';


function Bots({}) {
  return (
    <div className="bots">
      <h2 class="subtitle">Bots</h2>
      <div className="horizontal-button-container">
        <button
          className="button"
          type="button"
          onClick={() => {
            console.log('Find Bots clicked');
          }}>
          <FontAwesomeIcon icon={faProjectDiagram}/> Find Bots
        </button>
      </div>
    </div>);
}


function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Bots);

