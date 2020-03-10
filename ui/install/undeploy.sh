#!/usr/bin/env bash
printf "\n\n######## admin-ui undeploy ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

PROJECT=${PROJECT:-frontend}
IMAGE_REPOSITORY=${ADMIN_UI_IMAGE_REPOSITORY:-quay.io/redhatdemo/2020-admin-ui:latest}

oc project ${PROJECT}
echo "Deploying ${IMAGE_REPOSITORY}"

oc process -f ${DIR}/admin-ui.yml | oc delete -f -
