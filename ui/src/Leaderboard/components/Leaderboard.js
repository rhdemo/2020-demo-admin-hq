import React  from 'react';
import { connect } from 'react-redux';
import './Leaderboard.scss';


function Leaderboard({leaderboard}) {
  const leaderboardText = typeof leaderboard === 'string' ? leaderboard : JSON.stringify(leaderboard, null, 2)
  return <div className='leaderboard'>
    <h1 className='title'>Leaderboard ({typeof leaderboard})</h1>
    <code>
      {leaderboardText}
    </code>
  </div>
}


function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);

