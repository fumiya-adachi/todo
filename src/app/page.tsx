"use client"

import { useEffect, useState } from "react"

type Todo = {
  id: number
  title: string
  description?: string | null
  completed: boolean
  createdAt: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos")
      const data = await res.json()
      setTodos(data)
    } catch (error) {
      console.error("Failed to fetch todos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleAddTodo = async () => {
    if (!title.trim()) return

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })

      if (!res.ok) {
        throw new Error("Failed to create todo")
      }

      setTitle("")
      fetchTodos()
    } catch (error) {
      console.error("Failed to add todo:", error)
    }
  }

  const deleteTodo = async (id: number) => {
    console.log("Deleting todo with ID:", id)
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })

    fetchTodos()
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <p className="text-sm font-medium text-slate-500">Todo App</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Tasks for Today
          </h1>
        </header>

        <section className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="新しいタスクを入力"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
            />
            <button
              onClick={handleAddTodo}
              className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
            >
              Add Todo
            </button>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Todo List</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              {todos.length} items
            </span>
          </div>

          {loading ? (
            <div className="py-10 text-center text-slate-500">Loading...</div>
          ) : todos.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              まだタスクがありません
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-3 w-3 rounded-full ${
                        todo.completed ? "bg-green-500" : "bg-slate-300"
                      }`}
                    />
                    <div>
                      <p
                        className={`font-medium ${
                          todo.completed
                            ? "text-slate-400 line-through"
                            : "text-slate-900"
                        }`}
                      >
                        {todo.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        ID: {todo.id}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}