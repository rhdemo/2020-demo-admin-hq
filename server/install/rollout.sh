#!/usr/bin/env bash
printf "\n\n######## admin-server rollout ########\n"

echo "Rolling out new version of admin-server"
oc rollout latest dc/admin-server
