import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import ProfileForm from "@/components/profile-form"

export default async function ProfilePage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center medical-gradient">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Connect Supabase to get started</h1>
      </div>
    )
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile - handle multiple or no rows
  const { data: profiles, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .order("created_at", { ascending: false })

  if (profileError) {
    console.error("Profile query error:", profileError)
    return (
      <div className="flex min-h-screen items-center justify-center medical-gradient">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Database Error</h1>
          <p className="text-gray-600 mb-4">Unable to load profile data.</p>
          <p className="text-sm text-red-600">{profileError.message}</p>
        </div>
      </div>
    )
  }

  if (!profiles || profiles.length === 0) {
    redirect("/auth/register")
  }

  const profile = profiles[0]

  return (
    <div className="min-h-screen medical-gradient">
      <ProfileForm user={user} profile={profile} />
    </div>
  )
}
