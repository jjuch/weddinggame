import * as React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

function App() {
    return (
        <div>
            <p>TEST</p>
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<App></App>)