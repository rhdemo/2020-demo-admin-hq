const log = require('../utils/log')('integration/poll-leaderboard');
const axios = require('../utils/axios');
const {LEADERBOARD_URL} = require('../utils/constants');



function pollLeaderboard(interval) {
  setTimeout(async () => {
    log.trace('checking service status');
    await getLeaderboard();
    pollLeaderboard(interval);
  }, interval);
}

async function getLeaderboard() {
  const startTime = new Date();

  try {
    const requestInfo = {
      timeout: 10000,
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
      url: new URL('/api/leaderboard', LEADERBOARD_URL).href
    };

    log.trace('leaderboard request %o', requestInfo);
    const response = await axios(requestInfo);
    log.trace('leaderboard = %o', response.data);
    global.polledLeaderboard = response.data;
  } catch (error) {
    global.polledLeaderboard = {error};
    log.error('leaderboard request failed %o', error.message);
  }

  const endTime = new Date();
  const timeDiff = endTime - startTime;

  if (timeDiff > 300) {
    log.warn(`leaderboard request took ${timeDiff} ms`);
  }
}



module.exports = pollLeaderboard;
