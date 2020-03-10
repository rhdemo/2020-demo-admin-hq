import React  from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog, faPause, faFlagCheckered, faUndo, faStar } from "@fortawesome/free-solid-svg-icons";
import GAME_STATES from '../../utilities/GameStates'
import { resetGame, sendPing, updateGameState } from '../actions';


function GameStatus({game, resetGame}) {
  function renderGameState() {
    switch (game.state) {
      case GAME_STATES.LOBBY:
        return <span className="notification"><FontAwesomeIcon icon={faHome}/> Lobby</span>;
      case GAME_STATES.STOPPED:
        return <span className="notification is-danger"><FontAwesomeIcon
          icon={faFlagCheckered}/> Stopped</span>;
      case GAME_STATES.PAUSED:
        return <span className="notification is-warning"><FontAwesomeIcon icon={faPause}/> Paused</span>;
      case GAME_STATES.ACTIVE:
        return <span className="notification is-success"><FontAwesomeIcon icon={faCog} spin={true}/> Active</span>;
      case GAME_STATES.BONUS:
        return <span className="notification is-success"><FontAwesomeIcon icon={faStar} spin={true}/> Bonus</span>;
      default:
        return <span className="notification is-black">{game.state || "???????"}</span>;
    }
  }

  if (!game) {
    return (
      <section className="section">
        <h1 className="title">Game Configuration Not Found: Reset Required</h1>
        <div className="horizontal-button-container">
          <button
            className="button"
            type="button"
            onClick={() => {
              resetGame();
            }}>
            <FontAwesomeIcon icon={faUndo}/> Reset
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="game-status">
      <h1 className="title">Game: {renderGameState()}</h1>
    </div>
  );
}


function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    resetGame: () => {
      dispatch(resetGame());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus);

