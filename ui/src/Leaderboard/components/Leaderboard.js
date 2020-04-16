import React, { useState } from 'react';
import { connect } from 'react-redux';
import lodashGet from 'lodash/get';
import LeaderTable from './LeaderTable';
import './Leaderboard.scss';


function Leaderboard({leaderboard, polledLeaderboard}) {
  const [leaderSource, updateLeaderSource] = useState('polled');

  const players = lodashGet(polledLeaderboard, 'total_players');
  const guesses = lodashGet(polledLeaderboard, 'total_rights') + lodashGet(polledLeaderboard, 'total_wrongs');
  const dollars = lodashGet(polledLeaderboard, 'total_dollars');
  const leaders = leaderSource === 'pushed' ? leaderboard : lodashGet(polledLeaderboard, 'leaders');

  return <div className='leaderboard'>
    <h1 className='title'>Leaderboard</h1>
    <div className='game-stats'>
      <div className='game-stat'><strong>Players:</strong> {players}</div>
      <div className='game-stat'><strong>Guesses:</strong> {guesses}</div>
      <div className='game-stat'><strong>Dollars:</strong> ${dollars}</div>
    </div>
    <h3 className="subtitle leaders">Leaders</h3>
    <div className='control leader-source-control'>
      <label className='radio'>
        <input
          type='radio'
          value='polled'
          name='polled'
          onChange={(e) => updateLeaderSource(e.currentTarget.value)}
          checked={leaderSource === 'polled'}/>
        Polled
      </label>
      <label className='radio'>
        <input
          type='radio'
          value='pushed'
          name='pushed'
          onChange={(e) => updateLeaderSource(e.currentTarget.value)}
          checked={leaderSource === 'pushed'}/>
        Pushed
      </label>
    </div>
    <LeaderTable leaders={leaders}/>
  </div>;
}


function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);

