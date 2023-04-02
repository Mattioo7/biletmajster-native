#!/bin/bash

# replace Organizer with OrganizerDTO to prevent declaration conflict
cp api/API.json API.json
cp api/apiClient.ts client.ts
sed -i -e 's/schemas\/Organizer/schemas\/OrganizerDTO/g' api/API.json
sed -i -e 's/"Organizer":/"OrganizerDTO":/g' api/API.json
sta --path api/API.json --disable-throw-on-error --output api --clean-output
mv client.ts api/apiClient.ts
mv API.json api/API.json
