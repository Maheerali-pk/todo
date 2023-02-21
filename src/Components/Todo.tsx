import {
   Box,
   Icon,
   IconButton,
   Input,
   ListItem,
   makeStyles,
   ListItemText,
   TextField,
} from "@material-ui/core";
import {
   Check,
   CheckCircle,
   Delete,
   Done,
   DoneAllRounded,
   Edit,
   Save,
} from "@material-ui/icons";
import * as React from "react";
import { Component } from "react";
import { Context, ITodo } from "../Context";

const useStyles = makeStyles((theme: any) => ({
   root: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
         backgroundColor: theme.palette.secondary.main,
      },
      [theme.breakpoints.up("md")]: {
         backgroundColor: theme.palette.primary.main,
      },
   },
}));

const Todo: React.FC<ITodo> = ({ active, completed, text, id }) => {
   const [state, dispatch] = React.useContext(Context);
   const [tempText, setTempText] = React.useState(text);
   const renderTodoText = () => {
      if (active) {
         return (
            <TextField
               className="edit-input"
               value={tempText}
               onChange={onEditInputChange}
            />
         );
      } else return <ListItemText primary={text}></ListItemText>;
   };
   const onEditInputChange = (e: React.ChangeEvent) => {
      setTempText((e.target as HTMLInputElement).value);
   };
   let classes = [];
   if (active) {
      classes.push("active");
   }
   if (completed) {
      classes.push("completed");
   }
   return (
      <Box
         padding={0}
         className={classes.join(" ")}
         borderBottom="0.1px solid gray"
      >
         <ListItem button>
            <Box
               display="flex"
               alignItems="center"
               width="100%"
               flexWrap="wrap"
            >
               <Box marginRight="auto">{renderTodoText()}</Box>
               <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  flexWrap="wrap"
               >
                  {!completed && (
                     <IconButton
                        className="check"
                        onClick={() => dispatch({ "complete-todo": id })}
                     >
                        <CheckCircle
                           style={{ color: "greenyellow" }}
                        ></CheckCircle>
                     </IconButton>
                  )}
                  {active ? (
                     <IconButton
                        onClick={() =>
                           dispatch({
                              "end-edit-todo": { text: tempText, todoId: id },
                           })
                        }
                        color="primary"
                        className="save-edit-btn"
                     >
                        <Save />
                     </IconButton>
                  ) : (
                     <IconButton
                        onClick={() => dispatch({ "start-edit-todo": id })}
                        color="primary"
                        className="edit-btn"
                     >
                        <Edit />
                     </IconButton>
                  )}
                  <IconButton
                     onClick={() => dispatch({ "delete-todo": id })}
                     color="secondary"
                     className="delete-btn"
                  >
                     <Delete />
                  </IconButton>
               </Box>
            </Box>
         </ListItem>
      </Box>
   );
};

export default Todo;
