import * as React from "react";
import { useState } from "react";
import { useGameState } from "./hooks/gamestate";
import { createRoot } from "react-dom/client";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { songs } from "../../albums/database_test.json";

import MultipleSelectNative from "./select_album";

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;


function App() {

    const [gameState, sendCommand] = useGameState();
    const [songA, setSongA] = useState(songs[0]);
    const [songB, setSongB] = useState(songs[0]);
    return (
        <div>
            <pre>{JSON.stringify(gameState, null, 2)}</pre>
            <p>{songA.title}</p>
            <p>{songB.title}</p>
            <select multiple size={10} onChange={e => setSongA(JSON.parse(e.target.value))}>
                {songs.map((song, index) => {
                    return <option key={index + '1'} value={JSON.stringify(song)}>{song.title}</option>
                })}
            </select>
            <select multiple size={10} onChange={e => setSongB(JSON.parse(e.target.value))}>
                {songs.map((song, index) => {
                    return <option key={index + '2'} value={JSON.stringify(song)}>{song.title}</option>
                })}
            </select>
            <button onClick={() => sendCommand({name: 'start_competition', song_a: songA, song_b: songB})}>Start Competition</button>
            {/* <SelectGrid/> */}
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<App></App>)