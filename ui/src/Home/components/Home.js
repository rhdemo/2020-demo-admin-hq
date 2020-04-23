import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import GameStatus from '../../GameStatus';
import GameTools from '../../GameTools';
import Leaderboard from '../../Leaderboard';
import Bots from '../../Bots';

import './Home.scss';
import { skipAuthCheck, sendAuthCheck } from '../actions';

function Home({game, validAuth, skipAuth, sendAuthCheck, skipAuthCheck}) {
  const [tab, updateTab] = useState('leaderboard');
  const [usernameText, updateUsernameText] = useState('');
  const [passwordText, updatePasswordText] = useState('');
  const [showPassword, updateShowPassword] = useState(true);

  function renderAuth() {
    if (validAuth) {
      return null;
    }
    return (
      <div className="notification">
        <p>Read Only Mode.  To change game settings, please <a className="" onClick={() => skipAuthCheck(false)}>log in</a></p>
      </div>);
  }

  function renderTab() {
    switch (tab) {
      case 'bots':
        return (
          <section className='section'>
            <Bots/>
          </section>
        );
      default:
        return (
          <section className='section'>
            <Leaderboard/>
          </section>
        );
    }
  }

  function onLoginKey(e) {
    if (e.key === 'Enter') {
      sendAuthCheck(usernameText, passwordText);
    }

    if (e.key === 'Escape') {
      skipAuthCheck(true);
    }
  }

  return (
    <div className='home'>
      {renderAuth()}
      <section className='section'>
        <GameStatus game={game}/>
        <GameTools/>
      </section>
      <div className='tabs is-boxed'>
        <ul>
          <li className={tab === 'leaderboard' ? 'is-active' : ''}>
            <a onClick={() => updateTab('leaderboard')}>Leaderboard</a>
          </li>
          <li className={tab === 'bots' ? 'is-active' : ''}>
            <a onClick={() => updateTab('bots')}>Bots</a>
          </li>
        </ul>
      </div>
      {renderTab()}
      <div className={cx('modal', 'login-modal', {'is-active': !validAuth && !skipAuth})}>
        <div className='modal-background'/>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Login</p>
            <button className='delete' aria-label='close' onClick={() => skipAuthCheck(true)}/>
          </header>
          <section className='modal-card-body'>
            <p className=''>Log in required make game changes.  Skip for read-only mode</p>
            <form className='login-form'
                  onKeyDownCapture={onLoginKey}>
              <div className='field'>
                <label className='label'>Username</label>
                <div className='control username-input-control'>
                  <input
                    className='input'
                    type='text'
                    placeholder='username'
                    value={usernameText}
                    onChange={e => updateUsernameText(e.target.value)}
                  />
                </div>
              </div>
             <div className='field'>
               <label className='label'>Password
                 <FontAwesomeIcon className='toggle-hide-password' onClick={() => updateShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye}/>
               </label>
                <div className='control password-input-control'>
                  <input
                    className='input'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='password'
                    value={passwordText}
                    onChange={e => updatePasswordText(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success' onClick={() => sendAuthCheck(usernameText, passwordText)}>Submit</button>
            <button className='button' onClick={() => skipAuthCheck(true)}>Skip</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    sendAuthCheck: (username, password) => {
      dispatch(sendAuthCheck(username, password));
    },
    skipAuthCheck: (skipAuth) => {
      dispatch(skipAuthCheck(skipAuth));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
