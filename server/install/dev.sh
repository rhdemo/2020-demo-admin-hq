#!/usr/bin/env bash
printf "\n\n######## admin-server dev ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

ENV_FILE=${DIR}/../../.env.dev
echo $ENV_FILE
source ${ENV_FILE}
for ENV_VAR in $(sed 's/=.*//' ${ENV_FILE}); do export "${ENV_VAR}"; done

ADMIN_SERVER_PORT=${ADMIN_SERVER_PORT:-'8083'}
DATAGRID_HOST=${DATAGRID_HOST:-'0.0.0.0'}
DATAGRID_HOTROD_PORT=${DATAGRID_HOTROD_PORT:-'11222'}
LEADERBOARD_URL=${LEADERBOARD_URL:-'http://localhost:1234'}


cd "${DIR}/.."
pwd

npm install
PORT=${ADMIN_SERVER_PORT} \
DATAGRID_HOST=${DATAGRID_HOST} \
DATAGRID_HOTROD_PORT=${DATAGRID_HOTROD_PORT} \
LEADERBOARD_URL=${LEADERBOARD_URL} \
npm run dev