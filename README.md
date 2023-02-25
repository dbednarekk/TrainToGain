# TrainToGain

## About this project

Social web application for creating, sharing and managing your workout routines and progress at the gym.

## Stack used in project

- Django Rest Framework
- PostgreSQL
- Poetry
- Pytest
- ReactJS
- Redux
- Bootstrap

## Setup

### Prerequisites

1. Install [Docker](https://docs.docker.com/get-docker/)
2. Build the app image and run containers by typing `docker-compose up --build`

The application uses persistent storage for Postgres which is managed by docker. In order to wipe storage, remove docker volumes with command `docker-compose down -v`.

The application is ready to go, check http://localhost:8000/doc/swagger/ or http://localhost:8000/doc/redoc/ for interactive API documentation.

## TBD
- [ ] Frontend part of application is still under development.

