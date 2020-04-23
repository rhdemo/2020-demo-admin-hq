import React from 'react';
import { connect } from 'react-redux';
import {sortBy} from 'lodash';
import './Bots.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faUndo } from '@fortawesome/free-solid-svg-icons';
import { sendBotPing, updateBotConfig } from '../actions';
import Cluster from './Cluster';

function buildTableData(edgeStats) {
  if (!edgeStats) {
    return [];
  }
  return sortBy(Object.values(edgeStats), ['clusterName']);
}

function Bots({sendBotPing, resetBotConfig, updateBotConfig, edgeStats, botConfig, username, password, validAuth}) {
  function updateClusterConfig(clusterName, propName, value) {
    let botConfig = {};
    botConfig[clusterName] = {};
    botConfig[clusterName][propName] = value;
    updateBotConfig(botConfig, username, password);
  }

  const clusters = buildTableData(edgeStats);

  return (
    <div className='bots'>
      <div className='bots-heading'>
        <h1 className='title'>Bots</h1>
        <div className='horizontal-button-container'>
          <button
            className='button'
            type='button'
            disabled={!validAuth}
            onClick={() => {
              sendBotPing(username, password)
            }}>
            <FontAwesomeIcon icon={faProjectDiagram}/> Refresh Servers
          </button>
          <button
            className='button'
            type='button'
            disabled={!validAuth}
            onClick={() => {
              resetBotConfig(username, password)
            }}>
            <FontAwesomeIcon icon={faUndo}/> Reset All
          </button>
        </div>
      </div>
      {clusters.map((cluster, idx) => (
        <Cluster
        key={idx}
        cluster={cluster}
        clusterConfig={botConfig[cluster.clusterName]}
        updateClusterInterval={(interval) => {updateClusterConfig(cluster.clusterName, 'interval', interval)}}
        updateClusterBots={(bots) => {updateClusterConfig(cluster.clusterName, 'bots', bots)}}
        editable={validAuth}
        />))}
    </div>);
}


function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    sendBotPing: (username, password) => {
      dispatch(sendBotPing(username, password));
    },
    resetBotConfig: (username, password) => {
      dispatch(updateBotConfig('PUT', {}, username, password));
    },
    updateBotConfig: (botConfig, username, password) => {
      dispatch(updateBotConfig('PATCH', botConfig, username, password));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bots);

