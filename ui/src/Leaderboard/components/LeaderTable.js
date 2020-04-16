import React from 'react';


function LeaderTable({leaders}) {
  if (!leaders) {
    return null;
  }

  return (
    <div className='leader-table'>
      <table className='table'>
        <thead>
        <tr>
          <th>Place</th>
          <th>Name</th>
          <th>Score</th>
          <th>Right</th>
          <th>Wrong</th>
          <th>Original Server</th>
          <th>Current Server</th>
        </tr>
        </thead>
        <tbody>
        {leaders.map((l, idx) => (
          <tr>
            <td>{idx + 1}</td>
            <td>{l.username}</td>
            <td>${l.score}</td>
            <td>{l.right}</td>
            <td>{l.wrong}</td>
            <td>{l.creationServer}</td>
            <td>{l.gameServer}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>);
}


export default LeaderTable;

