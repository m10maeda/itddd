# Introduction to Domain-Driven Design

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
[![Project Status: Concept – Minimal or no implementation has been done yet, or the repository is only intended to be a limited example, demo, or proof-of-concept.](https://www.repostatus.org/badges/latest/concept.svg)](https://www.repostatus.org/#concept)

This is a Domain-Driven Design example project.

## Getting Started

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```shell
docker-compose up -d
```

Open <http://localhost:3000>.

To shutdown all running containers:

```shell
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

## Read more

- [Documents](docs/README.md)
- [Architecture](ARCHITECTURE.md)
