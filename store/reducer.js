import { createSclice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: {},
  status: "idle",
};
export const fetchTodo = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("http://127.0.0.1:8000/todos/");
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  const response = await axios.post("http://127.0.0.1:8000/todos/", newTodo);
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updateTodo) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/todos/${updateTodo.id}`,
      updateTodo
    );
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId) => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/todos/${todoId}`
    );
    return todoId;
  }
);

const todoReducer = createSclice({
  name: "todos",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => (state.status = "loading"))
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos[action.payload.id] = action.payload;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos[action.payload.id] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos[action.payload];
      });
  },
});

export default todoReducer.reducers;
