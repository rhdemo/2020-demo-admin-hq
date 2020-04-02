import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStop, faPlay, faStar, faPause, faUndo } from "@fortawesome/free-solid-svg-icons";
import { sendPing, updateGameState, resetGame } from '../actions';
import GAME_STATES from '../../utilities/GameStates'
import './GameTools.scss';

function GameTools({game, updateGameState, resetGame}) {
  if (!game) {
    return <div/>;
  }

  return (
    <div className="game-tools horizontal-button-container">
      <button
        className="button"
        type="button"
        onClick={() => {
          updateGameState(GAME_STATES.LOBBY);
        }}>
        <FontAwesomeIcon icon={faHome}/> Lobby
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          updateGameState(GAME_STATES.STOPPED);
        }}>
        <FontAwesomeIcon icon={faStop}/> Stop
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          updateGameState(GAME_STATES.PAUSED);
        }}>
        <FontAwesomeIcon icon={faPause}/> Pause
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          updateGameState(GAME_STATES.ACTIVE);
        }}>
        <FontAwesomeIcon icon={faPlay}/> Play
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          updateGameState(GAME_STATES.BONUS);
        }}>
        <FontAwesomeIcon icon={faStar}/> Bonus
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          resetGame();
        }}>
        <FontAwesomeIcon icon={faUndo}/> Reset
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    updateGameState: (state) => {
      dispatch(updateGameState(state));
    },
    resetGame: () => {
      dispatch(resetGame());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTools);

