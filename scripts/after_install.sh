#!/bin/bash

set -e

# build should be provided by CodeDeploy in files section of appspec.yml
BUILD_PATH=/tmp/mbackend_build/mbackend.tar.gz

TMP_DIR=/tmp/mobile-backend-$(date +%s)
mkdir -p "$TMP_DIR"
tar -zxf "$BUILD_PATH" -C "$TMP_DIR"
mv /home/ubuntu/mobile-backend /home/ubuntu/mobile-backend-old && mv "$TMP_DIR" /home/ubuntu/mobile-backend
rm -rf /home/ubuntu/mobile-backend-old
