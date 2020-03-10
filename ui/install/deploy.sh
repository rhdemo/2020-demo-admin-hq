#!/usr/bin/env bash
printf "\n\n######## admin-ui deploy ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

PROJECT=${PROJECT:-frontend}
ROUTE_NAME=${ROUTE_NAME:-admin}
IMAGE_REPOSITORY=${ADMIN_UI_IMAGE_REPOSITORY:-quay.io/redhatdemo/2020-admin-ui:latest}
REPLICAS=${ADMIN_UI_REPLICAS:-1}

oc project ${PROJECT}
echo "Deploying ${IMAGE_REPOSITORY}"

oc process -f "${DIR}/admin-ui.yml" \
  -p IMAGE_REPOSITORY=${IMAGE_REPOSITORY} \
  -p REPLICAS=${REPLICAS} \
  -p ROUTE_NAME=${ROUTE_NAME} \
  | oc create -f -
