import React from 'react';
import { connect } from 'react-redux';
import GameStatus from '../../GameStatus';
import GameTools from '../../GameTools';
import Leaderboard from '../../Leaderboard';
import Bots from '../../Bots';

import './Home.scss';

function Home({game}) {
  return (
    <div className="home">
      <section className="section">
        <GameStatus game={game}/>
        <GameTools/>
      </section>
      {/*<section className="section">*/}
      {/*  <Bots/>*/}
      {/*</section>*/}
      <section className="section">
        <Leaderboard/>
      </section>
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
