#!/bin/bash
if [ -z "$1" ]; then
    echo "Please provide a project name"
    echo "Usage: ./scripts/create-project.sh my-new-project"
    exit 1
fi

git clone --depth 1 https://github.com/ethereum-optimism/superchain-starter.git "../$1"
cd "../$1"
rm -rf .git
git init
git add .
git commit -m "Initial set up"
