FROM node:15.5.0 as dev

RUN mkdir -p /workspace \
    && chown node:node -R /workspace

WORKDIR workspace

COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node . ./

USER node

RUN yarn install

EXPOSE 8080

FROM node:15.5.0 as builder

RUN mkdir -p /workspace \
    && chown node:node -R /workspace

WORKDIR workspace

COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node . ./

USER node

COPY --from=dev --chown=node:node /workspace/node_modules /workspace/node_modules

COPY --chown=node:node . /workspace

RUN yarn build

FROM nginx:1.17.10-alpine as prod

RUN rm -rf /usr/share/nginx/html && mkdir /usr/share/nginx/html

COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/build /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html