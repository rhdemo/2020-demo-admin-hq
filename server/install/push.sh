#!/usr/bin/env bash
printf "\n\n######## admin-server push ########\n"

IMAGE_REPOSITORY=${ADMIN_SERVER_IMAGE_REPOSITORY:-quay.io/redhatdemo/2020-admin-server:latest}

echo "Pushing ${IMAGE_REPOSITORY}"
docker push ${IMAGE_REPOSITORY}
