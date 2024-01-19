FROM python:3.10

WORKDIR /build

COPY ./requirements.txt /build/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /build/requirements.txt

COPY ./app /build/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]