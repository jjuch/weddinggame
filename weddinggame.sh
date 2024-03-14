#!/bin/bash

source ENV/Scripts/activate
uvicorn weddinggame.server:app
deactivate