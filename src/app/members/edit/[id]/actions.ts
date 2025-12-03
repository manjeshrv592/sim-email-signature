"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { countries } from "@/lib/countries"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(1, "Contact number is required"),
  designation: z.string().min(1, "Designation is required"),
  countryCode: z.string().optional(),
  signature: z.boolean().default(true),
})

export async function updateMember(id: string, values: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, countryCode } = validatedFields.data

  try {
    // Check if email is already taken by another member
    const existingMember = await db.member.findFirst({
      where: {
        email,
        NOT: { id },
      },
    })

    if (existingMember) {
      return { error: "Email already exists" }
    }

    // Find country name from country code
    const country = countryCode 
      ? countries.find((c) => c.code === countryCode)?.name 
      : null

    await db.member.update({
      where: { id },
      data: {
        ...validatedFields.data,
        country: country || null,
      },
    })

    revalidatePath("/members")
    return { success: "Member updated successfully!" }
  } catch (error) {
    console.error("Database Error:", error)
    return { error: "Something went wrong!" }
  }
}
