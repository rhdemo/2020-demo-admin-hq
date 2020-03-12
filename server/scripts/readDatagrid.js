var infinispan = require("infinispan");

var DATAGRID_HOST = process.env.DATAGRID_HOST || "127.0.0.1";
var DATAGRID_PORT = process.env.DATAGRID_HOTROD_PORT || 11222;

async function readAll(options) {
  console.log(`=========== ${DATAGRID_HOST}:${DATAGRID_PORT} ${JSON.stringify(options) || "default"} =================`);
  const client = await infinispan.client({port: DATAGRID_PORT, host: DATAGRID_HOST}, options);

  const stats = await client.stats();
  console.log(stats);

  let clientIterator = await client.iterator(1);

  let entry = {done: true};

  do {
    entry = await clientIterator.next();
    if (!entry.done) {
      console.log('key = "' + entry.key + '"');
      console.log('value = "' + entry.value + '"');
    }

  } while (!entry.done);

  await clientIterator.close();

  client.disconnect();
}

(async function () {
  const cacheName = process.argv[2] || "game";
  await readAll({cacheName});
})();
