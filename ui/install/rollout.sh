#!/usr/bin/env bash
#!/usr/bin/env bash
 admin-ui rollout ########\n"

echo "Rolling out new version of admin-ui"
oc rollout latest dc/admin-ui

