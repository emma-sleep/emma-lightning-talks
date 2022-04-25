ARG NODE_IMAGE=bitnami/node:17.9.0@sha256:dd28044f0e104bbaca3aabbce6e2f717aaad292e29cb7e8bed6309bda37b1b20

FROM ${NODE_IMAGE}

# the WORKDIR of this image is /app
ENV NODE_PATH=/app/

COPY index.mjs /app/index.mjs
RUN mkdir -p /assets && chown -R 1001:1001 /assets

# ensure that we'll not be running the container as root
USER 1001:1001

ENTRYPOINT ["node", "--experimental-fetch", "/app/index.mjs"]