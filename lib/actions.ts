"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Update the signIn function to handle redirects properly
export async function signIn(prevState: any, formData: FormData) {
  // Check if formData is valid
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  // Validate required fields
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    // Return success instead of redirecting directly
    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Update the signUp function to handle potential null formData
export async function signUp(prevState: any, formData: FormData) {
  // Check if formData is valid
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  // Validate required fields
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    const { error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signUpWithProfile(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const firstName = formData.get("first_name")
  const lastName = formData.get("last_name")
  const phone = formData.get("phone")
  const userType = formData.get("user_type")

  // Lab technician specific fields
  const labName = formData.get("lab_name")
  const labLicenseNumber = formData.get("lab_license_number")
  const labAddress = formData.get("lab_address")

  if (!email || !password || !firstName || !lastName || !userType) {
    return { error: "Required fields are missing" }
  }

  // Validate lab technician required fields
  if (userType === "lab_technician" && (!labName || !labLicenseNumber || !labAddress)) {
    return { error: "Laboratory information is required for lab technicians" }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    // Prepare metadata for the auth user
    const metadata: any = {
      first_name: firstName.toString(),
      last_name: lastName.toString(),
      user_type: userType.toString(),
      phone: phone?.toString() || null,
    }

    // Add lab technician specific metadata
    if (userType === "lab_technician") {
      metadata.lab_name = labName?.toString()
      metadata.lab_license_number = labLicenseNumber?.toString()
      metadata.lab_address = labAddress?.toString()
    }

    // Create auth user with metadata (trigger will create profile)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        data: metadata,
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      return { error: authError.message }
    }

    if (!authData.user) {
      return { error: "Failed to create user account" }
    }

    // Wait a moment for the trigger to complete
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update the profile with additional fields that the trigger might not handle
    if (userType === "lab_technician" || phone) {
      try {
        const updateData: any = {}

        if (phone) updateData.phone = phone.toString()
        if (userType === "lab_technician") {
          updateData.lab_name = labName?.toString()
          updateData.lab_license_number = labLicenseNumber?.toString()
          updateData.lab_address = labAddress?.toString()
        }

        if (Object.keys(updateData).length > 0) {
          await supabase.from("users").update(updateData).eq("id", authData.user.id)
        }
      } catch (updateError) {
        console.warn("Profile update after creation failed:", updateError)
        // Don't fail the registration for this
      }
    }

    return {
      success: "Account created successfully! Please check your email to verify your account before signing in.",
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  await supabase.auth.signOut()
  redirect("/auth/login")
}

export async function updateProfile(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const userId = formData.get("user_id")
  const firstName = formData.get("first_name")
  const lastName = formData.get("last_name")
  const phone = formData.get("phone")

  // Lab technician specific fields
  const labName = formData.get("lab_name")
  const labLicenseNumber = formData.get("lab_license_number")
  const labAddress = formData.get("lab_address")

  if (!userId || !firstName || !lastName) {
    return { error: "Required fields are missing" }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    // Get current user to verify ownership
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== userId) {
      return { error: "Unauthorized" }
    }

    // Prepare update data
    const updateData: any = {
      first_name: firstName.toString(),
      last_name: lastName.toString(),
      phone: phone?.toString() || null,
    }

    // Add lab technician specific data if provided
    if (labName && labLicenseNumber && labAddress) {
      updateData.lab_name = labName.toString()
      updateData.lab_license_number = labLicenseNumber.toString()
      updateData.lab_address = labAddress.toString()
    }

    const { error } = await supabase.from("users").update(updateData).eq("id", userId)

    if (error) {
      console.error("Profile update error:", error)
      return { error: "Failed to update profile. Please try again." }
    }

    return { success: "Profile updated successfully!" }
  } catch (error) {
    console.error("Update profile error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
