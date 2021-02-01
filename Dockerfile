FROM node:15.5.0

RUN mkdir -p /workspace \
    && chown node:node -R /workspace

WORKDIR workspace

COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node . ./

USER node

RUN yarn install

EXPOSE 8080