#!/bin/bash

VITE_API_URL=""

docker build \
			--build-arg VITE_API_URL=$VITE_API_URL \
			-t ai-web .
docker run -d --name ai-web -p 8000:8000 --rm ai-web