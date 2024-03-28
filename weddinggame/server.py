from __future__ import annotations
import asyncio
from contextlib import asynccontextmanager
import datetime
import json
import os
from threading import Thread
from weddinggame.game import Game, StartCompetition
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.templating import Jinja2Templates
from fastapi import Request
from fastapi.staticfiles import StaticFiles


task_started = False
tick_time = 0.5

game = Game()

async def run_game():
    start_time = datetime.datetime.now(tz=datetime.UTC)
    last_current_time = start_time
    await asyncio.sleep(tick_time)
    while True:
        current_time = datetime.datetime.now(tz=datetime.UTC)
        dt = current_time - last_current_time
        total_dt = current_time - start_time
        game.tick(total_dt=total_dt, dt=dt)
        await manager.broadcast(json.dumps({**game.to_dict()}))
        current_time = datetime.datetime.now(tz=datetime.UTC)
        await asyncio.sleep(
            tick_time
        )
        last_current_time = current_time


@asynccontextmanager
async def lifespan(app: FastAPI):
    asyncio.create_task(run_game())
    yield


app = FastAPI(lifespan=lifespan)
app.mount("/static", StaticFiles(directory="weddinggame/web/static"), name="static")
app.mount("/albums", StaticFiles(directory="albums"), name="albums")


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()

templates = Jinja2Templates(directory="weddinggame/web/templates")


@app.get("/")
async def get(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/backend")
async def get(request: Request):
    return templates.TemplateResponse("backend.html", {"request": request})


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            raw_data = await websocket.receive_text()
            # print(raw_data)
            data = json.loads(raw_data)
            match data:
                case {"name": "start_competition", **rest}:
                    game.run_command(StartCompetition.from_dict(rest))

    except WebSocketDisconnect:
        manager.disconnect(websocket)

