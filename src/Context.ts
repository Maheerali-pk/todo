import { uniqueId } from "cypress/types/lodash";
import { createContext, Dispatch, useContext, useReducer } from "react";
import Todo from "./Components/Todo";

type TodoId = string;

export interface ITodo {
   text: string;
   completed: boolean;
   active: boolean;
   id: TodoId;
}
interface IState {
   todos: ITodo[];
   title: string;
}

export const initialState: IState = {
   todos: [],
   title: "Todo app",
};

type ActionType = {
   "delete-todo": TodoId;
   "add-todo": string;
   "start-edit-todo": TodoId;
   "complete-todo": TodoId;
   "end-edit-todo": { todoId: string; text: string };
};
type ActionNames = keyof ActionType;
const functionsObject: {
   [k in ActionNames]: (state: IState, data: ActionType[k]) => IState;
} = {
   "add-todo": (state, data) => {
      return {
         ...state,
         todos: [
            ...state.todos,
            {
               active: false,
               completed: false,
               id: Math.random().toString(),
               text: data,
            },
         ],
      };
   },
   "complete-todo": (state, data) => {
      const { todos } = state;
      const index = todos.findIndex((todo) => todo.id === data) as number;
      const newTodo = { ...todos[index], completed: true };
      return {
         ...state,
         todos: [...todos.slice(0, index), newTodo, ...todos.slice(index + 1)],
      };
   },
   "delete-todo": (state, data) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== data),
   }),
   "start-edit-todo": (state, data) => {
      const { todos } = state;
      const index = todos.findIndex((todo) => todo.id === data) as number;
      const newTodo = { ...todos[index], active: true };
      return {
         ...state,
         todos: [...todos.slice(0, index), newTodo, ...todos.slice(index + 1)],
      };
   },
   "end-edit-todo": (state, data) => {
      const { todos } = state;
      const index = todos.findIndex(
         (todo) => todo.id === data.todoId
      ) as number;
      const newTodo: ITodo = {
         ...todos[index],
         active: false,
         text: data.text,
      };
      return {
         ...state,
         todos: [...todos.slice(0, index), newTodo, ...todos.slice(index + 1)],
      };
   },
};

export const reducer = (state: IState, action: Partial<ActionType>): IState => {
   let tempState: IState = state;
   Object.entries(action).forEach(([key, data]) => {
      tempState = (
         functionsObject[key as ActionNames] as (
            state: IState,
            data: Partial<ActionType>[ActionNames]
         ) => IState
      )(tempState, data);
   });
   for (let key in action) {
   }
   return tempState;
};

type IContext = [IState, React.Dispatch<Partial<ActionType>>];
export const initialContext: IContext = [initialState, () => {}];

export const Context = createContext(initialContext);
