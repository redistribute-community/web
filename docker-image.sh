#!/bin/sh
set -e
docker compose build --no-cache app
doctl registry login
yes | doctl registry garbage-collection start --include-untagged-manifests
docker tag nextjs registry.digitalocean.com/redistribute-community/nextjs
docker push registry.digitalocean.com/redistribute-community/nextjs
