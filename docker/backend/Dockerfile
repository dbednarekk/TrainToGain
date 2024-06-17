FROM python:3.11-slim

WORKDIR /app

COPY ../../poetry.lock .
COPY ../../pyproject.toml .
RUN pip install poetry
RUN poetry install --no-root

COPY ../../TrainToGain ./TrainToGain
COPY ../../manage.py .

