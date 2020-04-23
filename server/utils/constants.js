const env = require('env-var');

const PORT = env.get('PORT', '8080').asIntPositive();
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
const LOG_LEVEL = env.get('LOG_LEVEL', 'info').asString();
const ADMIN_USERNAME = env.get('ADMIN_USERNAME', '').asString();
const ADMIN_PASSWORD = env.get('ADMIN_PASSWORD', '').asString();
const LEADERBOARD_URL = env.get('LEADERBOARD_URL', 'http://leaderboard-api.leaderboard.svc.cluster.local:8080').asString();
const CLUSTER_NAME = env.get('CLUSTER_NAME', 'HQ').asString();
const HOSTNAME = env.get('HOSTNAME', 'unknown-host').asString();


module.exports = {
  PORT,
  IP,
  LOG_LEVEL,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  LEADERBOARD_URL,
  CLUSTER_NAME,
  HOSTNAME
};
