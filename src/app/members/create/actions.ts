"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(1, "Contact number is required"),
  designation: z.string().min(1, "Designation is required"),
  signature: z.boolean().default(true),
})

export async function createMember(values: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email } = validatedFields.data

  try {
    const existingMember = await db.member.findUnique({
      where: { email },
    })

    if (existingMember) {
      return { error: "Email already exists" }
    }

    await db.member.create({
      data: validatedFields.data,
    })

    revalidatePath("/members")
    return { success: "Member created!" }
  } catch (error) {
    console.error("Database Error:", error)
    return { error: "Something went wrong!" }
  }
}
