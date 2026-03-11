import { NextResponse } from "next/server"
import { findTodos, createTodo } from "@/repositories/todoRepository"

export async function GET() {
  const todos = await findTodos()
  return NextResponse.json(todos)
}

export async function POST(req: Request) {
  const body = await req.json()
  const todo = await createTodo(body.title)

  return NextResponse.json(todo)
}
