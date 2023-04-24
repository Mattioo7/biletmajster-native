# Project
## Run project with command
expo start -c

[//]: # (TODO: Update this section)
# Mock data
## Mock db without any placeschema
npx json-server --watch data/db.json --port 8000 --routes data/routes.json

## Mock db with placeschema
npx json-server --watch data/db2.json --port 8000 --routes data/routes.json