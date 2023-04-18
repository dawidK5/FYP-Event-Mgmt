FROM python:latest
ENV name web
# WORKDIR /usr/src/app
WORKDIR /
RUN mkdir code
WORKDIR /code

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# COPY . .
CMD [ "python", "/code/manage.py", "runserver", "0.0.0.0:8000" ]