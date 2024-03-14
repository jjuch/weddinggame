from __future__ import annotations
from abc import ABC, abstractmethod
import dataclasses
import datetime
from typing import Literal, Protocol
import time


@dataclasses.dataclass(frozen=True, kw_only=True)
class Song:
    cover: str
    title: str
    artist: str


@dataclasses.dataclass(frozen=True, kw_only=True)
class StartCompetition:
    song_a: Song
    song_b: Song


@dataclasses.dataclass(frozen=True, kw_only=True)
class GoIdle:
    pass


Command = StartCompetition | GoIdle


class State(ABC):

    def command_received(self, command: Command, total_dt: datetime.timedelta) -> State:
        return self
    
    def tick(self, total_dt: datetime.timedelta, dt: datetime.timedelta) -> State:
        return self


@dataclasses.dataclass(kw_only=True, frozen=True)
class Idle(State):
    name: Literal['idle'] = 'idle'
    def command_received(self, command: Command) -> State:
        return self


class Game:
    def __init__(self):
        self.state = Idle()
        self.current_tick = 0
        self.total_dt = datetime.timedelta(seconds=0)

    def tick(self, total_dt: datetime.timedelta, dt: datetime.timedelta):
        self.total_dt = total_dt
        self.current_tick += 1
            
    def to_dict(self) -> dict:
        return {
            "state": dataclasses.asdict(self.state),
            "tick": self.current_tick,
            "total_dt": self.total_dt.total_seconds(),
        }
