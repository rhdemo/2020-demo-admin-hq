import React from 'react';
import { sortBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faRobot } from '@fortawesome/free-solid-svg-icons';
import SavingEditField from '../../common/SavingEditField';
import BotServer from './BotServer';

function buildTableData(cluster) {
  if (!cluster.bots) {
    return [];
  }
  return sortBy(Object.values(cluster.bots), ['hostname']);
}

function Cluster({cluster, clusterConfig, updateClusterBots, updateClusterInterval}) {
  const botServers = buildTableData(cluster);
  const botsPerServer = clusterConfig && Number.isInteger(clusterConfig.bots) ? clusterConfig.bots : 0;
  const botInterval = clusterConfig && Number.isInteger(clusterConfig.interval) ? clusterConfig.interval : 0;

  function updateInterval(value) {
    let newValue = parseInt(value, 10);
    if (isNaN(newValue)) {
      return;
    }
    if (newValue < 0) {
      newValue = 0;
    }
    updateClusterInterval(newValue);
  }

  function updateBots(value) {
    let newValue = parseInt(value, 10);
    if (isNaN(newValue)) {
      return;
    }
    if (newValue < 0) {
      newValue = 0;
    }
    updateClusterBots(newValue);
  }

  function incrementBots(changeStr) {
    const change = parseInt(changeStr, 10);
    let newValue = botsPerServer + change;
    updateBots(newValue);
  }

  return (
    <div className='cluster'>
      <h3 className='subtitle'>{cluster.clusterName}: {cluster.players} Players</h3>
      <div className='bots-per-cluster'>
        <div className='field'>
          <label className='label'><FontAwesomeIcon icon={faClock}/> Bot Interval</label>
          <SavingEditField
            type='number'
            value={botInterval}
            onSave={updateInterval}/>
        </div>
        <div className='field'>
          <label className='label'><FontAwesomeIcon icon={faRobot}/> Bots Per Server</label>
          <SavingEditField
            type='number'
            value={botsPerServer}
            onSave={updateBots}/>
        </div>
        <div className='button-bar'>
          <button
            className='button'
            type='button'
            onClick={() => {
              incrementBots(-100);
            }}>-100
          </button>
          <button
            className='button'
            type='button'
            onClick={() => {
              incrementBots(-10);
            }}>-10
          </button>
          <button
            className='button'
            type='button'
            onClick={() => {
              incrementBots(-1);
            }}>-1
          </button>
          <button
            className='button'
            type='button'
            onClick={() => {
              incrementBots(1);
            }}>+1
          </button>
          <button
            className='button'
            type='button'
            onClick={() => {
              incrementBots(10);
            }}>+10
          </button>
          <button
            className='button'
            type='button'
            onClick={() => {
              incrementBots(100);
            }}>+100
          </button>
        </div>
      </div>
      <table className='table machine-list-table'>
        <thead>
        <tr>
          <th>Bot Server</th>
          <th># Bots</th>
        </tr>
        </thead>
        <tbody>
        {botServers.map((bs, idx) => <BotServer key={idx} server={bs}/>)}
        </tbody>
      </table>
    </div>);
}


export default Cluster;

