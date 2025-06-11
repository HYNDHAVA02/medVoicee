"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugProfile() {
  const [user, setUser] = useState<any>(null)
  const [profiles, setProfiles] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadData() {
      try {
        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()
        if (userError) throw userError
        setUser(user)

        if (user) {
          // Get all profiles for this user
          const { data: profiles, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .order("created_at", { ascending: false })

          if (profileError) throw profileError
          setProfiles(profiles || [])
        }
      } catch (err: any) {
        setError(err.message)
      }
    }

    loadData()
  }, [supabase])

  if (error) {
    return (
      <Card className="medical-card max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-red-600">Debug Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="medical-card max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Debug Information</CardTitle>
        <CardDescription>Current user and profile data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Auth User:</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">{JSON.stringify(user, null, 2)}</pre>
        </div>

        <div>
          <h3 className="font-semibold">Profiles ({profiles.length}):</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">{JSON.stringify(profiles, null, 2)}</pre>
        </div>
      </CardContent>
    </Card>
  )
}
