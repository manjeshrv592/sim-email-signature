"use server"

import { db } from "@/lib/db"

const MEMBERS_PER_PAGE = 10

export async function getMembers({ page = 1 }: { page?: number }) {
  try {
    const skip = (page - 1) * MEMBERS_PER_PAGE
    
    const [members, totalCount] = await Promise.all([
      db.member.findMany({
        skip,
        take: MEMBERS_PER_PAGE,
        orderBy: {
          createdAt: "desc",
        },
      }),
      db.member.count(),
    ])

    const totalPages = Math.ceil(totalCount / MEMBERS_PER_PAGE)

    return {
      data: members,
      totalCount,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error("Database Error:", error)
    return {
      data: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
    }
  }
}
