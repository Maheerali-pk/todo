import {
   Box,
   Input,
   InputBase,
   makeStyles,
   TextField,
   Typography,
} from "@material-ui/core";
import * as React from "react";
import { Component, ChangeEvent, KeyboardEvent } from "react";
import { Context } from "../Context";

const styles = makeStyles({
   resize: {
      fontSize: "1.5rem",
   },
});

const Footer: React.FC = () => {
   const [state, dispatch] = React.useContext(Context);
   const onInputKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      const input = e.target as HTMLInputElement;
      const value = input.value;
      if (e.key === "Enter") {
         if (value !== "") {
            dispatch({ "add-todo": value });
            input.value = "";
         }
      }
   };
   return (
      <TextField
         InputProps={{ style: { fontSize: "1.3rem" }, id: "add-input" }}
         style={{ width: "100%", paddingTop: "1rem" }}
         onKeyUp={onInputKeyDown}
      ></TextField>
   );
};

export default Footer;
