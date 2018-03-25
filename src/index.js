import React from "react";
import { render } from "react-dom";
import { injectGlobal } from "styled-components";

import App from "./App";

injectGlobal`
    * { box-sizing: border-box; font-family: 'Roboto', sans-serif; }
    body { 
        margin: 0; 
        background: #76b852; 
        background: linear-gradient(to left, #76b852, #8DC26F); 
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: antialiased;
    }
`;

render(<App />, document.querySelector("#app"));
