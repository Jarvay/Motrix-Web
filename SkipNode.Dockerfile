FROM python:3.10.12-slim

WORKDIR /app

COPY ./flask .
RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt

COPY ./dist /app/public

CMD ["python", "app.py"]

EXPOSE 5000
