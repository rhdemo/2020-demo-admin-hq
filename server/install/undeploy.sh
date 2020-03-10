#!/usr/bin/env bash
printf "\n\n######## admin-server undeploy ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

PROJECT=${PROJECT:-frontend}
IMAGE_REPOSITORY=${ADMIN_SERVER_IMAGE_REPOSITORY:-quay.io/redhatdemo/2020-admin-server:latest}

oc project ${PROJECT}
echo "Undeploying ${IMAGE_REPOSITORY}"

oc process -f ${DIR}/admin-server.yml | oc delete -f -
