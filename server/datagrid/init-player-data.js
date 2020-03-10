const infinispan = require("infinispan");
const env = require("env-var");

const log = require("../utils/log")("datagrid");

const DATAGRID_HOST = env.get("DATAGRID_HOST").asString();
const DATAGRID_PORT = env.get("DATAGRID_HOTROD_PORT").asIntPositive();

async function initClient() {
  let client = await infinispan.client({port: DATAGRID_PORT, host: DATAGRID_HOST}, {cacheName: "players"});
  log.info(`Connected to Infinispan player data`);

  let stats = await client.stats();
  log.debug(stats);
  return client;
}


async function initPlayerData() {
  try {
    global.playerData = await initClient();
  } catch (error) {
    log.error(`Error connecting to Infinispan player data: ${error.message}`);
    log.error(error);
  }
  return global.playerData;
}

module.exports = initPlayerData;
