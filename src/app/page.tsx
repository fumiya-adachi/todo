"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [todos, setTodos] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(setTodos)
  }, [])

  return (
    <div>
      <h1>Todo</h1>

      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  )
}