import { List, Grid, Box } from "@material-ui/core";
import { sizing } from "@material-ui/system";
import * as React from "react";
import { Component } from "react";
import { Context } from "../Context";
import Todo from "./Todo";

export interface TodosProps {}

const Todos: React.FC<TodosProps> = () => {
   const [{ todos }] = React.useContext(Context);
   return (
      <List style={{ width: "100%" }} id="todos">
         {todos.map((todo) => (
            <Todo {...todo}></Todo>
         ))}
      </List>
   );
};

export default Todos;
