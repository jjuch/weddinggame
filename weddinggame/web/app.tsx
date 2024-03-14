import * as React from "react";
import { createRoot } from "react-dom/client";
import { useGameState } from "./hooks/gamestate";
import { useCallback, useEffect, useState } from "react";
import { useAnimationFrame, useAnimationTime } from "./hooks/animation";

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;


function App() {
  const [gameState, sendCommand] = useGameState();
  useEffect(() => {
    // window.addEventListener("mousemove", (e) => {
      // sendCommand({ type: "pointer", position: [e.clientX, e.clientY] });
    // });
  }, []);
  return <>
    <h2 style={{color: 'white'}}>JOEPIE</h2>
  </>
  
  
}
const root = createRoot(document.getElementById("root"));
root.render(<App></App>);
