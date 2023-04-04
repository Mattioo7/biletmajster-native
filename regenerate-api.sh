#!/bin/bash

# replace Organizer with OrganizerDTO to prevent declaration conflict
mv api/apiClient.ts client.ts
curl https://raw.githubusercontent.com/PW-MiNI-IO2-2023-Group-3/Specyfikacja/main/API.json --silent --output API.json
# sed -i -e 's/schemas\/Organizer/schemas\/OrganizerDTO/g' API.json
# sed -i -e 's/\"Organizer\":/\"OrganizerDTO\":/g' API.json
sta --path API.json --disable-throw-on-error --output api --clean-output
mv client.ts api/apiClient.ts
mv API.json api/API.json
