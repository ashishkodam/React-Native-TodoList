from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity. You can restrict to specific origins in production.
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Model for Todo item
class TodoItem(BaseModel):
    id: int
    title: str
    completed: bool
    category: str

# Dummy data for initial testing
todos = [
    {"id": 1, "title": "Finish project", "completed": False, "category": "Work"},
    {"id": 2, "title": "Buy groceries", "completed": False, "category": "Personal"},
]

# GET all todos
@app.get("/todos", response_model=List[TodoItem])
def read_todos():
    return todos

# GET a specific todo by ID
@app.get("/todos/{todo_id}", response_model=TodoItem)
def read_todo(todo_id: int):
    todo = next((todo for todo in todos if todo["id"] == todo_id), None)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

# Create a new todo
@app.post("/todos", response_model=TodoItem)
def create_todo(todo: TodoItem):
    new_todo = {"id": len(todos) + 1, "title": todo.title, "completed": todo.completed, "category": todo.category}
    todos.append(new_todo)
    return new_todo

# Update an existing todo by ID
@app.put("/todos/{todo_id}", response_model=TodoItem)
def update_todo(todo_id: int, todo: TodoItem):
    for t in todos:
        if t["id"] == todo_id:
            t["title"] = todo.title
            t["completed"] = todo.completed
            t["category"] = todo.category
            return t
    raise HTTPException(status_code=404, detail="Todo not found")

# Delete a todo by ID
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    global todos
    todos = [todo for todo in todos if todo["id"] != todo_id]
    return {"message": "Todo deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
