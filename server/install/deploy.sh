#!/usr/bin/env bash
printf "\n\n######## admin-server deploy ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

PROJECT=${PROJECT:-frontend}
IMAGE_REPOSITORY=${ADMIN_SERVER_IMAGE_REPOSITORY:-quay.io/redhatdemo/2020-admin-server:latest}
REPLICAS=${ADMIN_SERVER_REPLICAS:-1}

oc project ${PROJECT}
echo "Deploying ${IMAGE_REPOSITORY}"

oc process -f "${DIR}/admin-server.yml" \
  -p IMAGE_REPOSITORY=${IMAGE_REPOSITORY} \
  -p REPLICAS=${REPLICAS} \
  | oc create -f -
