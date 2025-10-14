FROM node:22-bookworm

RUN apt-get update && apt-get install -y \
    git curl wget vim python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

RUN npm install -g hardhat 

USER node