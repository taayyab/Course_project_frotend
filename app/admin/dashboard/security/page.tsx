"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/admin/ui/card"
import { Button } from "@/components/admin/ui/button"
import { Badge } from "@/components/admin/ui/badge"
import { Switch } from "@/components/admin/ui/switch"
import { AlertTriangle, Eye, UserX, Shield } from "lucide-react"

// Dummy security alerts data
const securityAlerts = [
  {
    id: 1,
    type: "Suspicious Login",
    priority: "High",
    description: "Multiple failed login attempts from unknown IP",
    user: "mike.chen@email.com",
    time: "2 Hours ago",
  },
  {
    id: 2,
    type: "Suspicious Login",
    priority: "High",
    description: "Multiple failed login attempts from unknown IP",
    user: "mike.chen@email.com",
    time: "2 Hours ago",
  },
  {
    id: 3,
    type: "Suspicious Login",
    priority: "High",
    description: "Multiple failed login attempts from unknown IP",
    user: "mike.chen@email.com",
    time: "2 Hours ago",
  },
  {
    id: 4,
    type: "Suspicious Login",
    priority: "High",
    description: "Multiple failed login attempts from unknown IP",
    user: "mike.chen@email.com",
    time: "2 Hours ago",
  },
]

export default function SecurityCompliance() {
  const [aiDetectionRules, setAiDetectionRules] = useState({
    fakeProfileDetection: true,
    suspiciousPaymentPatterns: true,
    multipleAccountDetection: true,
  })

  const handleInvestigate = (alertId: number) => {
    console.log("Investigating alert:", alertId)
  }

  const handleBlockUser = (alertId: number) => {
    console.log("Blocking user for alert:", alertId)
  }

  const toggleAiRule = (rule: string) => {
    setAiDetectionRules((prev) => ({
      ...prev,
      [rule]: !prev[rule as keyof typeof prev],
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e242c]">Platform Security & Compliance</h1>
        <p className="text-[#696984] mt-1">Monitor security threats and ensure regulatory Compliance</p>
      </div>

      {/* Security Alert Banner */}
      <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-[#dc2626] mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[#dc2626] font-medium">
              2 high-priority security alerts require immediate attention. Review and take action to maintain platform
              security.
            </p>
          </div>
        </div>
      </div>

      {/* Apprenticeship Placement Analytics */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-[#dc2626]" />
          <h2 className="text-lg font-semibold text-[#1e242c]">Apprenticeship Placement Analytics</h2>
        </div>

        <div className="space-y-4">
          {securityAlerts.map((alert) => (
            <Card key={alert.id} className="bg-[#ffffff] border-[#f5f5f5]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-[#1e242c]">{alert.type}</h3>
                      <Badge className="bg-[#dc2626] text-white hover:bg-[#dc2626]/90">{alert.priority}</Badge>
                    </div>
                    <p className="text-[#696984] mb-3">{alert.description}</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-[#696984]">User: </span>
                        <span className="text-[#1e242c]">{alert.user}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-sm text-[#696984]">{alert.time}</span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleInvestigate(alert.id)}
                        className="text-[#696984] border-[#696984]"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Investigate
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleBlockUser(alert.id)}
                        className="bg-[#dc2626] text-white hover:bg-[#dc2626]/90"
                      >
                        <UserX className="w-4 h-4 mr-1" />
                        Block User
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Detection Rules */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#1e242c]">AI Detection Rules</h2>

        <div className="space-y-4">
          <Card className="bg-[#ffffff] border-[#f5f5f5]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#0755e9]" />
                  <div>
                    <h3 className="font-medium text-[#1e242c]">Fake Profile Detection</h3>
                    <p className="text-sm text-[#696984]">Automatically detect and flag suspicious user profiles</p>
                  </div>
                </div>
                <Switch
                  checked={aiDetectionRules.fakeProfileDetection}
                  onCheckedChange={() => toggleAiRule("fakeProfileDetection")}
                  className="data-[state=checked]:bg-[#0755e9]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#ffffff] border-[#f5f5f5]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#0755e9]" />
                  <div>
                    <h3 className="font-medium text-[#1e242c]">Suspicious Payment Patterns</h3>
                    <p className="text-sm text-[#696984]">Monitor unusual payment behaviors and transactions</p>
                  </div>
                </div>
                <Switch
                  checked={aiDetectionRules.suspiciousPaymentPatterns}
                  onCheckedChange={() => toggleAiRule("suspiciousPaymentPatterns")}
                  className="data-[state=checked]:bg-[#0755e9]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#ffffff] border-[#f5f5f5]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#0755e9]" />
                  <div>
                    <h3 className="font-medium text-[#1e242c]">Multiple Account Detection</h3>
                    <p className="text-sm text-[#696984]">Identify users creating multiple accounts</p>
                  </div>
                </div>
                <Switch
                  checked={aiDetectionRules.multipleAccountDetection}
                  onCheckedChange={() => toggleAiRule("multipleAccountDetection")}
                  className="data-[state=checked]:bg-[#0755e9]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
