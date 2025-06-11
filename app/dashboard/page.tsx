import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import GuardianDashboard from "@/components/guardian-dashboard"
import LabTechnicianDashboard from "@/components/lab-technician-dashboard"

export default async function DashboardPage() {
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
    error: userError,
  } = await supabase.auth.getUser()

  if (!user || userError) {
    redirect("/auth/login")
  }

  // Get user profile from our custom users table - handle multiple or no rows
  const { data: profiles, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .order("created_at", { ascending: false }) // Get the most recent if multiple exist

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

  // Handle no profile found
  if (!profiles || profiles.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center medical-gradient">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Profile Setup Required</h1>
          <p className="text-gray-600 mb-4">No profile found. Please complete your registration.</p>
          <a
            href="/auth/register"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Complete Registration
          </a>
        </div>
      </div>
    )
  }

  // Handle multiple profiles - use the first (most recent) one
  const profile = profiles[0]

  // If we have multiple profiles, log a warning
  if (profiles.length > 1) {
    console.warn(`User ${user.id} has ${profiles.length} profiles. Using the most recent one.`)
  }

  // Validate profile has required fields
  if (!profile.user_type || !profile.first_name || !profile.last_name) {
    return (
      <div className="flex min-h-screen items-center justify-center medical-gradient">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Incomplete Profile</h1>
          <p className="text-gray-600 mb-4">Your profile is missing required information.</p>
          <a
            href="/profile"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Complete Profile
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen medical-gradient">
      {profile.user_type === "guardian" ? (
        <GuardianDashboard user={user} profile={profile} />
      ) : (
        <LabTechnicianDashboard user={user} profile={profile} />
      )}
    </div>
  )
}
