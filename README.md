## FYP-Event-Mgmt

Web app prototype project built with multiple technologies

To run the database, api and django server:
1. Install docker and docker-compose
2. Start docker daemon
3. Clone the repository
4. To start the server: docker-compose -p webapp --env-file=default.env up
5. To shut down the server: docker-compose -p webapp --env-file=default.env down

Web app should be present on localhost:8000

Or, if running in Python:

pip install --no-cache-dir -r requirements.txt
py manage.py runserver

Default credentials:
z12Admin
rowing2023