import React  from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ConnectionStatus from '../../ConnectionStatus';
import Routes from '../../Routes';

import './App.scss';

function App() {
  return (
    <div className='app'>
      <ConnectionStatus/>
      <Routes/>
    </div>
  );
}

function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
