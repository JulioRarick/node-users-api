import { Prisma, User } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async fetchAllUsers() {
    const users = await prisma.user.findMany()

    return users
  }

  async deleteUser(userId: string) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }

  async updateUser(
    userId: string,
    data: { email?: string; name?: string; password?: string },
  ): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data,
    })
  }
}
