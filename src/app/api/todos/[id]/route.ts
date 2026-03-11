import { deleteTodo } from "@/repositories/todoRepository"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const todoId = Number(id)

  if (Number.isNaN(todoId)) {
    return Response.json({ error: "Invalid id" }, { status: 400 })
  }

  await deleteTodo(todoId)

  return Response.json({ success: true })
}