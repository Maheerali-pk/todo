import { Box, Container, Grid } from "@material-ui/core";
import * as React from "react";
import { Component } from "react";
import { Context, initialState, reducer } from "../Context";
import Footer from "./Footer";
import Todos from "./Todos";
import "./App.css";
export interface AppProps {}

const App: React.FC<AppProps> = () => {
   const [state, dispatch] = React.useReducer(reducer, initialState);
   return (
      <Context.Provider value={[state, dispatch]}>
         <Grid container justify="center">
            <Box flexDirection="column" display="flex" width="50%">
               <Box alignSelf="center">
                  <h2>Todos app</h2>
               </Box>
               <Box>
                  <Todos></Todos>
               </Box>
               <Box>
                  <Footer></Footer>
               </Box>
            </Box>
         </Grid>
      </Context.Provider>
   );
};

export default App;
