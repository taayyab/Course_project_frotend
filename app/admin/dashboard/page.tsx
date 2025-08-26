import { Users, BookOpen, Briefcase, DollarSign, AlertCircle, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Badge } from "@/components/admin/ui/badge"

export default function Dashboard() {
  return (
    
    <main className="flex-1 p-6">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Total Users</p>
                <p className="text-[#1e242c] text-2xl font-bold">12,847</p>
              </div>
              <div className="w-10 h-10 bg-[#e0f0e4] rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#377e36]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Active Courses</p>
                <p className="text-[#1e242c] text-2xl font-bold">1,234</p>
              </div>
              <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#5832e6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Job Placements</p>
                <p className="text-[#1e242c] text-2xl font-bold">892</p>
              </div>
              <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#5832e6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Monthly Revenue</p>
                <p className="text-[#1e242c] text-2xl font-bold">£45,678</p>
              </div>
              <div className="w-10 h-10 bg-[#e0f0e4] rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#377e36]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Actions */}
      <Card className="bg-[#ffffff] border-[#f5f5f5] mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-[#1e242c]">
            <AlertCircle className="w-5 h-5 mr-2 text-[#0755e9]" />
            Pending Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#fcfcff] rounded-lg">
            <div>
              <h4 className="font-medium text-[#1e242c]">KYC Verification</h4>
              <p className="text-[#696984] text-sm">23 items pending</p>
            </div>
            <Badge className="bg-[#ff9500] text-white hover:bg-[#ff9500]/90">High</Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#fcfcff] rounded-lg">
            <div>
              <h4 className="font-medium text-[#1e242c]">Course Approvals</h4>
              <p className="text-[#696984] text-sm">12 items pending</p>
            </div>
            <Badge className="bg-[#0755e9] text-white hover:bg-[#0755e9]/90">medium</Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#fcfcff] rounded-lg">
            <div>
              <h4 className="font-medium text-[#1e242c]">Course Approvals</h4>
              <p className="text-[#696984] text-sm">12 items pending</p>
            </div>
            <Badge className="bg-[#0755e9] text-white hover:bg-[#0755e9]/90">medium</Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#fcfcff] rounded-lg">
            <div>
              <h4 className="font-medium text-[#1e242c]">Payment Issues</h4>
              <p className="text-[#696984] text-sm">8 items pending</p>
            </div>
            <Badge className="bg-[#0755e9] text-white hover:bg-[#0755e9]/90">medium</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Request From Students Chart */}
        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[#1e242c]">Request From Students</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-[#696984]">
              <Calendar className="w-4 h-4" />
              <span>July</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#0755e9] text-sm">20 July 2020</span>
                <div className="text-right">
                  <span className="text-[#0755e9] font-bold">220,342.76</span>
                  <span className="text-[#377e36] text-sm ml-2">+3.4%</span>
                </div>
              </div>
              <div className="h-48 bg-[#fcfcff] rounded-lg flex items-center justify-center">
                <svg width="300" height="150" viewBox="0 0 300 150">
                  <polyline
                    fill="none"
                    stroke="#0755e9"
                    strokeWidth="2"
                    points="20,120 60,80 100,90 140,70 180,60 220,40 260,30"
                  />
                  <circle cx="260" cy="30" r="4" fill="#0755e9" />
                </svg>
              </div>
              <div className="flex justify-between text-xs text-[#696984]">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 5 Most Enrolled Courses */}
        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardHeader>
            <CardTitle className="text-[#1e242c]">Top 5 Most Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between space-x-2">
              <div className="flex flex-col items-center">
                <div className="w-12 h-20 bg-[#0755e9] rounded-t"></div>
                <span className="text-xs text-[#696984] mt-2 text-center">Web Development</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-16 bg-[#0755e9] rounded-t"></div>
                <span className="text-xs text-[#696984] mt-2 text-center">Data Science</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-32 bg-[#0755e9] rounded-t"></div>
                <span className="text-xs text-[#696984] mt-2 text-center">Digital Marketing</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#0755e9] rounded-t"></div>
                <span className="text-xs text-[#696984] mt-2 text-center">Mobile App</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-24 bg-[#0755e9] rounded-t"></div>
                <span className="text-xs text-[#696984] mt-2 text-center">Cyber Security</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardHeader>
            <CardTitle className="text-[#1e242c]">Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="50" fill="none" stroke="#f5f5f5" strokeWidth="12" />
                  <circle
                    cx="64"
                    cy="64"
                    r="50"
                    fill="none"
                    stroke="#0755e9"
                    strokeWidth="12"
                    strokeDasharray="157"
                    strokeDashoffset="39"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="50"
                    fill="none"
                    stroke="#5832e6"
                    strokeWidth="12"
                    strokeDasharray="157"
                    strokeDashoffset="118"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="50"
                    fill="none"
                    stroke="#ff9500"
                    strokeWidth="12"
                    strokeDasharray="157"
                    strokeDashoffset="157"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#0755e9] rounded-full mr-2"></div>
                <span className="text-[#696984]">Training Institutes</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#ff9500] rounded-full mr-2"></div>
                <span className="text-[#696984]">Students</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#5832e6] rounded-full mr-2"></div>
                <span className="text-[#696984]">Student & Employer</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Students by Region */}
        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardHeader>
            <CardTitle className="text-[#1e242c]">Active Students by Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#f5f5f5" strokeWidth="4" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#0755e9"
                      strokeWidth="4"
                      strokeDasharray="176"
                      strokeDashoffset="35"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#1e242c]">78%</span>
                  </div>
                </div>
                <p className="text-xs text-[#696984]">North America</p>
                <p className="text-xs text-[#1e242c] font-medium">3200</p>
              </div>

              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#f5f5f5" strokeWidth="4" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#0755e9"
                      strokeWidth="4"
                      strokeDasharray="176"
                      strokeDashoffset="88"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#1e242c]">50%</span>
                  </div>
                </div>
                <p className="text-xs text-[#696984]">Europe</p>
                <p className="text-xs text-[#1e242c] font-medium">2000</p>
              </div>

              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#f5f5f5" strokeWidth="4" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#c4c4c4"
                      strokeWidth="4"
                      strokeDasharray="176"
                      strokeDashoffset="164"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#1e242c]">07%</span>
                  </div>
                </div>
                <p className="text-xs text-[#696984]">Asia Pacific</p>
                <p className="text-xs text-[#1e242c] font-medium">150</p>
              </div>

              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#f5f5f5" strokeWidth="4" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#c4c4c4"
                      strokeWidth="4"
                      strokeDasharray="176"
                      strokeDashoffset="172"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#1e242c]">02%</span>
                  </div>
                </div>
                <p className="text-xs text-[#696984]">Latin America</p>
                <p className="text-xs text-[#1e242c] font-medium">40</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
