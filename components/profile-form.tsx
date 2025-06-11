"use client"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, User, ArrowLeft, Shield, FlaskConical } from "lucide-react"
import Link from "next/link"
import { updateProfile } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="medical-button">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Updating...
        </>
      ) : (
        "Update Profile"
      )}
    </Button>
  )
}

interface ProfileFormProps {
  user: any
  profile: any
}

export default function ProfileForm({ user, profile }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateProfile, null)
  const isGuardian = profile.user_type === "guardian"

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-sm text-gray-600">Manage your account information</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="medical-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {isGuardian ? (
                <Shield className="h-8 w-8 text-blue-600" />
              ) : (
                <FlaskConical className="h-8 w-8 text-indigo-600" />
              )}
            </div>
            <CardTitle className="text-2xl text-gray-900">
              {isGuardian ? "Guardian Profile" : "Lab Technician Profile"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Update your personal and professional information
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={formAction} className="space-y-6">
              <input type="hidden" name="user_id" value={profile.id} />

              {state?.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{state.error}</div>
              )}

              {state?.success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {state.success}
                </div>
              )}

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                      First Name *
                    </Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      defaultValue={profile.first_name}
                      className="medical-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                      Last Name *
                    </Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      defaultValue={profile.last_name}
                      className="medical-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    defaultValue={profile.email}
                    className="medical-input"
                    disabled
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={profile.phone || ""}
                    className="medical-input"
                  />
                </div>
              </div>

              {/* Lab Technician Specific Fields */}
              {!isGuardian && (
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900">Laboratory Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="lab_name" className="text-sm font-medium text-gray-700">
                      Laboratory Name *
                    </Label>
                    <Input
                      id="lab_name"
                      name="lab_name"
                      type="text"
                      required
                      defaultValue={profile.lab_name || ""}
                      className="medical-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lab_license_number" className="text-sm font-medium text-gray-700">
                      License Number *
                    </Label>
                    <Input
                      id="lab_license_number"
                      name="lab_license_number"
                      type="text"
                      required
                      defaultValue={profile.lab_license_number || ""}
                      className="medical-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lab_address" className="text-sm font-medium text-gray-700">
                      Laboratory Address *
                    </Label>
                    <textarea
                      id="lab_address"
                      name="lab_address"
                      required
                      rows={3}
                      defaultValue={profile.lab_address || ""}
                      className="medical-input resize-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6">
                <Link href="/dashboard">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    Cancel
                  </Button>
                </Link>
                <SubmitButton />
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
