# Python agent + retrieval API
FROM python:3.12-slim
WORKDIR /app
COPY pyproject.toml ./
COPY app ./app
RUN pip install --no-cache-dir .
EXPOSE 8000
RUN useradd -m maios
USER maios
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
