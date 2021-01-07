#!/bin/bash

set -e

# working directory should be something like:
# /opt/codedeploy-agent/deployment-root/3820674c-32d1-448e-bdd3-dc57d69af250/d-GMIE7G0B7/deployment-archive/

TMP_DIR=/tmp/mobile-backend-$(date +%s)
mkdir -p "$TMP_DIR"
tar -zxf mbackend.tar.gz -C "$TMP_DIR"
mv /home/ubuntu/mobile-backend /home/ubuntu/mobile-backend-old && mv "$TMP_DIR" /home/ubuntu/mobile-backend
rm -rf /home/ubuntu/mobile-backend-old


