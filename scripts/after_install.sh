#!/bin/bash

set -e

TMP_DIR=/tmp/mobile-backend-$(date +%s)
mkdir -p "$TMP_DIR"
pushd "$TMP_DIR"
tar -zxf /tmp/mbackend.tar.gz
popd

mv /home/ubuntu/mobile-backend /home/ubuntu/mobile-backend-old && mv "$TMP_DIR" /home/ubuntu/mobile-backend
rm -rf /home/ubuntu/mobile-backend-old
