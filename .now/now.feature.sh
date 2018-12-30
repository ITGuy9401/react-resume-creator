#!/bin/bash
set -e

CLEAN_BRANCH_NAME=${CIRCLE_BRANCH//\//-};

now --token $ZEIT_TOKEN rm "$CIRCLE_PROJECT_REPONAME-$CLEAN_BRANCH_NAME"

JSON=$(cat <<-EOF
{
    "name": "$CIRCLE_PROJECT_REPONAME-$CLEAN_BRANCH_NAME",
    "alias": "$CLEAN_BRANCH_NAME-circleci.now.sh",
    "builds": [
        {
            "src": "package.json",
            "use": "@now/static-build"
        }
    ],
    "routes": [
        {
            "src": "^/static/(.*)",
            "dest": "/static/$1"
        },
        {
            "src": "^/favicon.ico",
            "dest": "/favicon.ico"
        },
        {
            "src": "^/asset-manifest.json",
            "dest": "/asset-manifest.json"
        },
        {
            "src": "^/manifest.json",
            "dest": "/manifest.json"
        },
        {
            "src": "^/service-worker.js",
            "headers": {
                "cache-control": "s-maxage=0"
            },
            "dest": "/service-worker.js"
        },
        {
            "src": "^/precache-manifest.(.*)",
            "dest": "/precache-manifest.$1"
        },
        {
            "src": "^/(.*)",
            "dest": "/index.html"
        }
    ]
}
EOF
)

echo $JSON > .now/now.feature.json
