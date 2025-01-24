from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class Task(BaseModel):
    id: int
    title: str
    description: str
    completed: bool

tasks: List[Task] = []

@app.get("/")
def read_root():
    return {"message": "Welcome to the To-Do List API!"}

@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return tasks

@app.post("/tasks", response_model=Task)
def add_task(task: Task):
    global tasks
    new_id = max([t.id for t in tasks], default=0) + 1
    task.id = new_id
    tasks.append(task)
    return task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, updated_task: Task):
    for task in tasks:
        if task.id == task_id:
            task.title = updated_task.title
            task.description = updated_task.description
            task.completed = updated_task.completed
            return task
    return {"error": "Task not found"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [task for task in tasks if task.id != task_id]
    return {"message": f"Task with id {task_id} deleted"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # אפשר להגדיר דומיינים ספציפיים
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)