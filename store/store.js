import { configureStore } from "@reduxjs/toolkit";
import { TodoReducer } from "./reducer";

const store = configureStore({
  reducer: {
    todos: TodoReducer,
  },
});

export default store;
