import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FlaskConical, Users, FileText, Clock, Award } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen medical-gradient">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">MedReports</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/login">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Secure Medical Reports Platform</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect guardians with lab technicians for seamless medical report management. Secure, efficient, and
            HIPAA-compliant platform for healthcare professionals.
          </p>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Guardian Card */}
            <Card className="medical-card hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Guardian</CardTitle>
                <CardDescription className="text-gray-600">
                  Access and manage medical reports for your family members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Manage family health records</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">View detailed medical reports</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Real-time report notifications</span>
                  </div>
                </div>
                <Link href="/auth/register?role=guardian" className="block">
                  <Button className="w-full medical-button mt-6">Register as Guardian</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Lab Technician Card */}
            <Card className="medical-card hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                  <FlaskConical className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Lab Technician</CardTitle>
                <CardDescription className="text-gray-600">Upload and manage laboratory test results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <FlaskConical className="h-5 w-5 text-indigo-500" />
                    <span className="text-gray-700">Upload test results securely</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-indigo-500" />
                    <span className="text-gray-700">Licensed laboratory verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-indigo-500" />
                    <span className="text-gray-700">Patient communication tools</span>
                  </div>
                </div>
                <Link href="/auth/register?role=lab_technician" className="block">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mt-6">
                    Register as Lab Technician
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MedReports?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with healthcare professionals in mind, ensuring security, compliance, and ease of use.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">HIPAA Compliant</h4>
              <p className="text-gray-600">End-to-end encryption and secure data handling</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Real-time Updates</h4>
              <p className="text-gray-600">Instant notifications when reports are available</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Verified Labs</h4>
              <p className="text-gray-600">Only licensed laboratories can join our platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h5 className="text-xl font-bold">MedReports</h5>
            </div>
            <p className="text-gray-400 mb-4">Secure medical reports platform for healthcare professionals</p>
            <p className="text-sm text-gray-500">© 2024 MedReports. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
