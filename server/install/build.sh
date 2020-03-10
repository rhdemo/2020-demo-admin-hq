#!/usr/bin/env bash
printf "\n\n######## admin-server build ########\n"

IMAGE_REPOSITORY=${ADMIN_SERVER_IMAGE_REPOSITORY:-quay.io/redhatdemo/2020-admin-server:latest}
SOURCE_REPOSITORY_URL=${SOURCE_REPOSITORY_URL:-git@github.com:rhdemo/2020-demo-frontend.git}
SOURCE_REPOSITORY_REF=${SOURCE_REPOSITORY_REF:-master}

echo "Building ${IMAGE_REPOSITORY}/admin-server from ${SOURCE_REPOSITORY_URL} on ${SOURCE_REPOSITORY_REF}"

s2i build ${SOURCE_REPOSITORY_URL} --ref ${SOURCE_REPOSITORY_REF} --context-dir /admin-server ubi8/nodejs-12 ${IMAGE_REPOSITORY}
