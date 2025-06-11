import { isSupabaseConfigured } from "@/lib/supabase/server"
import DebugProfile from "@/components/debug-profile"

export default async function DebugPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center medical-gradient">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Supabase not configured</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen medical-gradient py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Debug Profile Data</h1>
        <DebugProfile />
      </div>
    </div>
  )
}
