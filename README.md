# Peerprep Webpage Service

## Table of Contents

- [Build Script](#build-script)
- [Docker Images](#docker-images)
  - [API](#api)
  - [API (Docker)](#api-docker)
- [Deployment](#deployment)
  - [Kubernetes Deployment](#kubernetes-deployment)
  - [Docker Compose Deployment](#docker-compose-deployment)

## Build Script

`build_images.sh` is a build script for building the Docker images and optionally pushing them to the container registry. To get more information about the script, run:

```
./build_images.sh -h
```

## Docker Images

### API

**Name:** ghcr.io/cs3219-ay2324s1-g04/peerprep_user_service_api

**Description:** Runs the API server which serves the static webpage content. This is the image to be used for production deployment via Kubernetes.

### API (Docker)

**Name:** ghcr.io/cs3219-ay2324s1-g04/peerprep_webpage_service_api_docker

**Description:** Runs the API server which serves the static webpage content. This is the image to be used for deployment via Docker compose.

## Deployment

### Kubernetes Deployment

This is the main deployment method for production.

**Prerequisite**

- Docker images must be pushed to the container registry and made public.
  - To push to the container registry (assuming one has the necessary permissions), run: `./build_images.sh -p`
  - To make the images public, change the visibility of the image on [GitHub](https://github.com/orgs/CS3219-AY2324S1-G04/packages).
- Kubernetes cluster must be setup as specified in the [main repository](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g04/blob/master/project/project.md#g04-project).

**Steps:**

1. Ensure the "peerprep" namespace has been created: `kubectl create namespace peerprep`
2. Navigate to the "kubernetes" directory: `cd kubernetes`
3. Deploy the Kubernetes objects: `./deploy.sh`
    - To delete the Kubernetes objects, run: `./delete.sh`

### Docker Compose Deployment

This is intended for development use only. It is meant to make developing other services easier.

**Note:**

- No horizontal auto scaling is provided.
- Make sure that the all services are up.
- The container for the API is not exposed and must be accessed through the Gateway Service.

**Prerequisite**

- Docker images must be built.
  - To build the images, run: `./build_images.sh`

**Steps:**

1. Ensure that the "peerprep" network exist: `docker network create -d bridge peerprep`
2. Create the docker containers: `docker compose up`
    - To delete the docker containers, run: `docker compose down`
