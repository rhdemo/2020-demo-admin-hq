import React  from 'react';
import { connect } from 'react-redux';
import './ConnectionStatus.scss';


function ConnectionStatus(
  {
    connection,
    connectionUrl,
    connectionError,
    lastHeartbeat
  }) {
  return (
    <nav className={'connection-status level ' + connection}>
      <div className='level-left'>
        <div className='level-item has-text-centered'>
          <div>
            <p className='heading'>{connectionUrl}: {connection}</p>
          </div>
        </div>
      </div>
      <div className='level-right'>
        <div className='level-item has-text-centered'>
          <div>
            <p className='heading'>Last Heartbeat: {JSON.stringify(lastHeartbeat)}</p>
          </div>
        </div>
      </div>
    </nav>);
}


function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionStatus);

