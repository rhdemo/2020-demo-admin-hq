import React from 'react';
import { connect } from 'react-redux';
import GameStatus from './GameStatus';
import State from './State';

import './Home.scss';

function Home({game}) {
  return (
    <div className="home">
      <div className="gameplay">
        <GameStatus game={game}/>
        <State/>
      </div>
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
