import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faRobot } from '@fortawesome/free-solid-svg-icons';
import GameStatus from '../../GameStatus';
import GameTools from '../../GameTools';
import Leaderboard from '../../Leaderboard';
import Bots from '../../Bots';

import './Home.scss';

function Home({game}) {
  const [tab, updateTab] = useState('game');

  function renderTab() {
    switch (tab) {
      case 'bots':
        return (
          <section className='section'>
            <Bots/>
          </section>
        );
      case 'leaderboard':
        return (
          <section className='section'>
            <Leaderboard/>
          </section>
        );
      default:
        return (
          <section className='section'>
            <GameStatus game={game}/>
            <GameTools/>
          </section>
        );
    }
  }

  return (
    <div className='home'>
      <div className='tabs is-boxed'>
        <ul>
          <li className={tab === 'game' ? 'is-active' : ''}>
            <a onClick={() => updateTab('game')}>Game</a>
          </li>
          <li className={tab === 'bots' ? 'is-active' : ''}>
            <a onClick={() => updateTab('bots')}>Bots</a>
          </li>
          <li className={tab === 'leaderboard' ? 'is-active' : ''}>
            <a onClick={() => updateTab('leaderboard')}>Leaderboard</a>
          </li>
        </ul>
      </div>
      {renderTab()}
    </div>
  );
}

function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
