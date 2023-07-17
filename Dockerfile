ARG use_mirrors

FROM node:16.18.0-slim AS builder

RUN yarn cache clean

RUN yarn config set registry https://registry.npm.taobao.org --global
RUN yarn config set SASS_BINARY_SITE https://registry.npm.taobao.org/mirrors/node-sass/ --global

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY . .

RUN yarn
RUN yarn build


FROM python:3.10.12-slim

WORKDIR /app

COPY ./flask .
RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt

COPY --from=builder /app/dist /app/public

CMD ["python", "app.py"]

EXPOSE 5000
