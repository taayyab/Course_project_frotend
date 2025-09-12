"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, Briefcase, DollarSign, AlertCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { getAdminAnalytics, getPlatformUsage, getStudentsByRegion } from "@/lib/admin.api";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [platformUsage, setPlatformUsage] = useState<any>(null);
  const [studentsByRegion, setStudentsByRegion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [a, p, r] = await Promise.all([
          getAdminAnalytics(),
          getPlatformUsage(),
          getStudentsByRegion(),
        ]);
        setAnalytics(a);
        setPlatformUsage(p);
        setStudentsByRegion(r);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        <p className="text-[#696984]">Loading dashboard data...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Total Users</p>
                <p className="text-[#1e242c] text-2xl font-bold">
                  {analytics?.totalUsers ?? 0}
                </p>
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
                <p className="text-[#696984] text-sm">Students</p>
                <p className="text-[#1e242c] text-2xl font-bold">
                  {analytics?.totalStudents ?? 0}
                </p>
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
                <p className="text-[#696984] text-sm">Employers</p>
                <p className="text-[#1e242c] text-2xl font-bold">
                  {analytics?.totalEmployers ?? 0}
                </p>
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
                <p className="text-[#696984] text-sm">Revenue</p>
                <p className="text-[#1e242c] text-2xl font-bold">
                  £{analytics?.totalRevenue ?? 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-[#e0f0e4] rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#377e36]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown (circle chart from platformUsage) */}
      <Card className="bg-[#ffffff] border-[#f5f5f5] mb-8">
        <CardHeader>
          <CardTitle className="text-[#1e242c] mb-4">Platform Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Students Chart */}
            <div className="flex flex-col items-center">
              <RadialBarChart
                width={140}
                height={140}
                innerRadius="80%"
                outerRadius="100%"
                data={[
                  {
                    name: "students",
                    value: platformUsage?.totalStudents ?? 0,
                    fill: "#3b82f6"
                  }
                ]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" background cornerRadius={10} />
              </RadialBarChart>
              <p className="mt-2 font-semibold text-lg">Students</p>
              <p className="text-gray-600">{platformUsage?.totalStudents ?? 0}</p>
            </div>

            {/* Schools Chart */}
            <div className="flex flex-col items-center">
              <RadialBarChart
                width={140}
                height={140}
                innerRadius="80%"
                outerRadius="100%"
                data={[
                  {
                    name: "schools",
                    value: platformUsage?.totalSchools ?? 0,
                    fill: "#10b981"
                  }
                ]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" background cornerRadius={10} />
              </RadialBarChart>
              <p className="mt-2 font-semibold text-lg">Schools</p>
              <p className="text-gray-600">{platformUsage?.totalSchools ?? 0}</p>
            </div>

            {/* Employers Chart */}
            <div className="flex flex-col items-center">
              <RadialBarChart
                width={140}
                height={140}
                innerRadius="80%"
                outerRadius="100%"
                data={[
                  {
                    name: "employers",
                    value: platformUsage?.totalEmployers ?? 0,
                    fill: "#f59e0b"
                  }
                ]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" background cornerRadius={10} />
              </RadialBarChart>
              <p className="mt-2 font-semibold text-lg">Employers</p>
              <p className="text-gray-600">{platformUsage?.totalEmployers ?? 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students by Region */}
      <Card className="bg-[#ffffff] border-[#f5f5f5]">
        <CardHeader>
          <CardTitle className="text-[#1e242c]">Active Students by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {studentsByRegion?.topRegions?.map((region: any, idx: number) => {
              const percent = studentsByRegion.totalStudents
                ? ((region.count / studentsByRegion.totalStudents) * 100).toFixed(1)
                : 0;
              return (
                <div key={idx} className="text-center">
                  <p className="text-xs text-[#696984]">{region.region}</p>
                  <p className="text-sm text-[#1e242c] font-medium">
                    {region.count} ({percent}%)
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
