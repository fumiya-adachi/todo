import { prisma } from "@/lib/prisma"

export const findTodos = async () => {
  return prisma.todo.findMany({
    orderBy: { createdAt: "desc" }
  })
}

export const createTodo = async (title: string) => {
  return prisma.todo.create({
    data: { title }
  })
}

export const deleteTodo = async (id: number) => {
  return prisma.todo.delete({
    where: { id }
  })
}