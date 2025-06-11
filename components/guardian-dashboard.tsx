"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, User, Bell, Settings, LogOut, Shield, Clock, Download } from "lucide-react"
import Link from "next/link"
import { signOut } from "@/lib/actions"

interface GuardianDashboardProps {
  user: any
  profile: any
}

export default function GuardianDashboard({ user, profile }: GuardianDashboardProps) {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MedReports</h1>
                <p className="text-sm text-gray-600">Guardian Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Link href="/profile">
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {profile.first_name}!</h2>
          <p className="text-gray-600">
            Manage your family's medical reports and stay updated with the latest results.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">3</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Family Members</p>
                  <p className="text-2xl font-bold text-green-600">4</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-purple-600">5</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Recent Reports</CardTitle>
              <CardDescription>Latest medical reports for your family</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Blood Test - John Doe", date: "2024-01-15", status: "Complete", lab: "City Lab" },
                  { name: "X-Ray - Jane Doe", date: "2024-01-12", status: "Complete", lab: "Medical Center" },
                  { name: "Urine Test - John Doe", date: "2024-01-10", status: "Pending", lab: "Quick Lab" },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{report.name}</p>
                      <p className="text-sm text-gray-600">
                        {report.lab} • {report.date}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        report.status === "Complete" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 medical-button">View All Reports</Button>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start medical-button">
                  <FileText className="h-4 w-4 mr-3" />
                  Request New Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <User className="h-4 w-4 mr-3" />
                  Manage Family Members
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Download className="h-4 w-4 mr-3" />
                  Download Reports
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
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
