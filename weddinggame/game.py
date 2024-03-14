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

    def to_dict(self):
        return dataclasses.asdict(self)


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
        match command:
            case StartCompetition(song_a=song_a, song_b=song_b):
                return Competition(song_a=song_a, song_b=song_b, end_time=total_dt + datetime.timedelta(minutes=10), score_a=1, score_b=1)
    
    def tick(self, total_dt: datetime.timedelta, dt: datetime.timedelta) -> State:
        return self

    @abstractmethod
    def to_dict(self):
        ...

@dataclasses.dataclass(kw_only=True, frozen=True)
class Idle(State):

    def command_received(self, command: Command, total_dt: datetime.timedelta) -> State:
        return self

    def to_dict(self):
        return {
            "name": "idle",
        }


@dataclasses.dataclass(kw_only=True, frozen=True)
class Competition(State):
    song_a: Song
    song_b: Song
    end_time: datetime.timedelta
    score_a: int
    score_b: int

    def tick(self, total_dt: datetime.timedelta, dt: datetime.timedelta) -> State:
        if total_dt > self.end_time:
            winner = self.song_a if self.score_a >= self.score_b else self.song_b
            return Victory(song=winner)
        return self

    def command_received(self, command: Command, total_dt: datetime.timedelta) -> State:
        return self

    def to_dict(self):
        return {
            **dataclasses.asdict(self),
            "name": "competition",
            "song_a": self.song_a.to_dict(),
            "song_b": self.song_b.to_dict(),
            "end_time": self.end_time.total_seconds(),
        }


@dataclasses.dataclass(kw_only=True, frozen=True)
class Victory(State):
    song: Song

    def command_received(self, command: Command, total_dt: datetime.timedelta) -> State:
        return self

    def to_dict(self):
        return {
            **dataclasses.asdict(self),
            "name": "competition",
            "song": self.song.to_dict(),
        }


class Game:
    def __init__(self):
        self.state = Competition(
            song_a=Song(cover="neildiamond_sweetcaroline.jpg", title="Sweet Caroline", artist="Neil Diamond"),
            song_b=Song(cover="oasis_wonderwall.jpg", title="Wonderwall", artist="Oasis"),
            score_a=1,
            score_b=1,
            end_time=datetime.timedelta(minutes=10),
        )
        self.current_tick = 0
        self.total_dt = datetime.timedelta(seconds=0)

    def tick(self, total_dt: datetime.timedelta, dt: datetime.timedelta):
        self.total_dt = total_dt
        self.current_tick += 1

    def run_command(self, command: Command):
        self.state = self.state.command_received(command, self.total_dt)

    def to_dict(self) -> dict:
        return {
            "state": self.state.to_dict(),
            "tick": self.current_tick,
            "total_dt": self.total_dt.total_seconds(),
        }
