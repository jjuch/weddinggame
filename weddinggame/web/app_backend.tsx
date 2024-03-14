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

import MultipleSelectNative from "./select_album";

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

function App() {

    const [gameState, sendCommand] = useGameState();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const SelectGrid = () => (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <MultipleSelectNative />
                </Grid>
                <Grid item xs={6}>
                    <Item>2</Item>
                </Grid>
            </Grid>
        </Box>
    );


    let Header = () => (
        <h1>Backend State : </h1>
    );

    return (
        <div>
            <Header />
            <SelectGrid/>
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<App></App>)