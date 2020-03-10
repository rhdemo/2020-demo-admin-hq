#!/usr/bin/env bash
printf "\n\n######## admin-ui push ########\n"

IMAGE_REPOSITORY=${ADMIN_UI_IMAGE_REPOSITORY:-quay.io/redhatdemo/2020-admin-ui:latest}

echo "Pushing ${IMAGE_REPOSITORY}"
docker push ${IMAGE_REPOSITORY}



