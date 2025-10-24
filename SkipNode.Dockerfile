FROM python:3.10.12-slim

WORKDIR /app

RUN pip install -i https://mirrors.ustc.edu.cn/pypi/simple pip -U
RUN pip config set global.index-url https://mirrors.ustc.edu.cn/pypi/simple
COPY ./flask .
RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt

COPY ./dist /app/public

CMD ["python", "app.py"]

EXPOSE 5000
