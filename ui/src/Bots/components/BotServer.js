import React from 'react';

function BotServer({server}) {
  return (<>
    <tr>
      <td>{server.hostname}</td>
      <td>{server.bots}</td>
    </tr>
  </>);
}


export default BotServer;

