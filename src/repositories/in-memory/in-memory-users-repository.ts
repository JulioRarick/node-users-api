import { randomUUID } from 'node:crypto'

import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }
    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      role: data.role || 'USER_MEMBER',
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async fetchAllUsers() {
    return this.items
  }

  async deleteUser(userId: string) {
    this.items = this.items.filter((user) => user.id !== userId)
  }

  async updateUser(userId: string, data: { role?: 'ADMIN' | 'USER_MEMBER' }) {
    this.items = this.items.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          ...data,
        }
      }
      return user
    })
  }
}
