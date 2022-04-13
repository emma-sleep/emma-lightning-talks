# Docker Compose - The Basics

This is a sample repo to showcase basic `docker compse` features.
It features an `nginx` server which hosts static assets and a small `nodejs` server which fetches a random cat image.
The services interact with each other via a shared `assets` volume to which the asset fetcher service posts its assets and from which the asset hoster service serves its assets.

To run this service, you need an API key from [the cat API](https://thecatapi.com/).
Just add a `.env` file in this directory with the following contents:

```
CAT_API_KEY=YOUR-API-KEY
```

The following features of docker compose are showcased:

- Running multiple services
  - Based on existing image
  - Based on Dockerfile
- Using virtual volumes and sharing them across services
- Port mapping
- Service dependencies
- Service environment variables
- Using an `.env` file

References:

- https://docs.docker.com/compose/
- https://docs.docker.com/compose/cli-command/
- https://thecatapi.com/
