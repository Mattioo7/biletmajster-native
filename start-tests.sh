#!/bin/bash

# exit with q.
prism mock api/API.json > /dev/null & npm test --watch
kill `pgrep -f prism`