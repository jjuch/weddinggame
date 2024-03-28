#!/bin/bash

source venv/Scripts/activate
uvicorn weddinggame.server:app
deactivate

# npm run dev