import { useCallback, useEffect, useRef, useState } from "react";
import albumData from '../../../albums/database_test.json';

type Idle = {
  name: 'idle'
}
type Song = {
  title: string;
  artist: string;
  cover: string;
}
type Competition = {
  name: 'competition';
  song_a: Song;
  song_b: Song;
  score_a: number;
  score_b: number;

}
type Victory = {
  name: 'victory';
  song: Song;
}

type State = Idle | Competition | Victory

type StartCompetition = {
  name: 'start_competition';
  song_a: Song;
  song_b: Song;
}

type Command = StartCompetition;

export const useGameState = () => {
  const [gameState, setGameState] = useState<{state: State}>({state: {name: 'idle'}});
  const ws = useRef<null | WebSocket>(null);
  const sendCommand = useCallback(
    (command: Command) => {
      console.log("command", command);
      ws.current?.send(JSON.stringify(command));
    },
    [ws]
  );
  useEffect(() => {
    function connect() {
      ws.current = new WebSocket(`ws://${document.location.host}/ws`);
      ws.current.addEventListener("message", (message) => {
        setGameState(JSON.parse(message.data));
      });
      ws.current.addEventListener('close', (e) => {
        setTimeout(connect, 500);
      });
      ws.current.addEventListener('error', (e) => {
        ws.current?.close();
      });
    }
    connect();
   
  }, []);
  return [gameState, sendCommand] as const;
};

export const useAlbumData = () => {
  return albumData;
}