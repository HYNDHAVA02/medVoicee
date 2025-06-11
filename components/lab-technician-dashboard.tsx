"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, User, Bell, Settings, LogOut, FlaskConical, Upload, Users, Award } from "lucide-react"
import Link from "next/link"
import { signOut } from "@/lib/actions"

interface LabTechnicianDashboardProps {
  user: any
  profile: any
}

export default function LabTechnicianDashboard({ user, profile }: LabTechnicianDashboardProps) {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MedReports</h1>
                <p className="text-sm text-gray-600">Lab Technician Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Link href="/profile">
                <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <form action={signOut}>
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, Dr. {profile.first_name} {profile.last_name}
          </h2>
          <p className="text-gray-600">
            {profile.lab_name} • License: {profile.lab_license_number}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reports Uploaded</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Patients</p>
                  <p className="text-2xl font-bold text-blue-600">89</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-green-600">23</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lab Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">4.9</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Recent Uploads</CardTitle>
              <CardDescription>Latest reports uploaded to the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { patient: "Patient #1234", test: "Complete Blood Count", date: "2024-01-15", status: "Delivered" },
                  { patient: "Patient #1235", test: "Lipid Panel", date: "2024-01-14", status: "Delivered" },
                  { patient: "Patient #1236", test: "Thyroid Function", date: "2024-01-13", status: "Processing" },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{report.test}</p>
                      <p className="text-sm text-gray-600">
                        {report.patient} • {report.date}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        report.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                View All Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                  <Upload className="h-4 w-4 mr-3" />
                  Upload New Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <Users className="h-4 w-4 mr-3" />
                  Manage Patients
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <FlaskConical className="h-4 w-4 mr-3" />
                  Lab Information
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
