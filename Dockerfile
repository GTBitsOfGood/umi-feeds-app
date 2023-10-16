# Install dependencies only when needed
FROM --platform=linux/amd64 node:16 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /usr/app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

FROM node:16 AS dev

WORKDIR /usr/app
COPY --from=deps /usr/app/node_modules ./node_modules
COPY . .

ENV NODE_COMMAND=dev
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.1

RUN npm i -g expo-cli@6.3.10 @expo/ngrok@^4.1.0

# If you want to use a different command, pass the NODE_COMMAND env variable to 
# docker-compose up --build

# Ex. NODE_COMMAND=build docker-compose up --build

EXPOSE 19000 19001 19002 19006

ENTRYPOINT ["sh", "-c", "npm run $NODE_COMMAND"]
