import React, { useState } from "react";
import { useTodoStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <div className="flex absolute top-10 -right-2 flex-col bg-primary w-80 items-center justify-center p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow mr-2"
        />
        <Button variant="secondary" type="submit">
          Add
        </Button>
      </form>
      <ul className="space-y-2 h-48 overflow-y-auto w-full mt-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-background px-2 rounded"
            >
              <div className="flex items-center">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="mr-2"
                />
                <span
                  className={todo.completed ? "line-through text-gray-500" : ""}
                >
                  {todo.text}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </Button>
            </li>
          ))
        ) : (
          <p className="text-neutral-500 mt-4 text-center">No todos yet</p>
        )}
      </ul>
    </div>
  );
};

export default Todo;
