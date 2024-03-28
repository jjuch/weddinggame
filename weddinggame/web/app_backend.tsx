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

let Header = (props) => (
    <h1>Backend State : {JSON.stringify(props.states)}</h1>
);

function SelectGrid () {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <MultipleSelectNative 
                        screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT}
                        id={1}
                        data={songs}
                        />
                </Grid>
                <Grid item xs={6}>
                    <MultipleSelectNative 
                        screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT}
                        id={2}
                        data={songs}/>
                </Grid>
            </Grid>
        </Box>
    );
}

function App() {

    const [gameState, sendCommand] = useGameState();

    return (
        <div>
            <Header states={gameState}/>
            <SelectGrid/>
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<App></App>)