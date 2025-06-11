"use client"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Shield, FlaskConical, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { signUpWithProfile } from "@/lib/actions"
import { useEffect } from "react"

function SubmitButton({ role }: { role: string }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full medical-button h-12">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Account...
        </>
      ) : (
        `Create ${role === "guardian" ? "Guardian" : "Lab Technician"} Account`
      )}
    </Button>
  )
}

export default function RegistrationForm() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "guardian"
  const [state, formAction] = useActionState(signUpWithProfile, null)

  const isGuardian = role === "guardian"
  const isLabTech = role === "lab_technician"

  useEffect(() => {
    if (state?.success) {
      // Clear form or show success message for longer
      setTimeout(() => {
        // Optionally redirect to login after showing success message
        // router.push("/auth/login")
      }, 3000)
    }
  }, [state])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

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
            {isGuardian ? "Guardian Registration" : "Lab Technician Registration"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isGuardian
              ? "Create your account to manage family medical reports"
              : "Join our network of verified laboratory professionals"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-6">
            <input type="hidden" name="user_type" value={role} />

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
                    className="medical-input"
                    placeholder="Enter your first name"
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
                    className="medical-input"
                    placeholder="Enter your last name"
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
                  className="medical-input"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="medical-input"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password *
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="medical-input"
                  placeholder="Create a secure password"
                />
              </div>
            </div>

            {/* Lab Technician Specific Fields */}
            {isLabTech && (
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
                    required={isLabTech}
                    className="medical-input"
                    placeholder="Enter laboratory name"
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
                    required={isLabTech}
                    className="medical-input"
                    placeholder="Enter laboratory license number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lab_address" className="text-sm font-medium text-gray-700">
                    Laboratory Address *
                  </Label>
                  <textarea
                    id="lab_address"
                    name="lab_address"
                    required={isLabTech}
                    rows={3}
                    className="medical-input resize-none"
                    placeholder="Enter complete laboratory address"
                  />
                </div>
              </div>
            )}

            <SubmitButton role={role} />

            <div className="text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
