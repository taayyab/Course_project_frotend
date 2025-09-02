"use client";

import { useEffect, useState } from "react";
import {
  CalendarClock,
  Users,
  Briefcase,
  BarChart3,
} from "lucide-react";
import { AppShell } from "@/components/institute/app-shell";
import { StatCard } from "@/components/institute/stat-card";
import { getDashboardAnalytics } from "@/lib/school.api";

interface Analytics {
  totalEnrollments: number;
  completionRate: string;
  totalRevenue: number;
  activeCourses: number;
}

export default function Page() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const data = await getDashboardAnalytics();
      setAnalytics(data);
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-[#1e242c]">Dashboard</h1>
        <p className="mt-1 text-[#696984]">
          Welcome back! Here&apos;s what&apos;s happening with your talent pipeline.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {loading ? (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </>
          ) : analytics ? (
            <>
              <StatCard
                icon={<Users className="h-4 w-4 text-[#0755e9]" />}
                label="totalEnrollments"
                value={analytics.totalEnrollments.toString()}
                delta="+12% from last month"
              />
              <StatCard
                icon={<Briefcase className="h-4 w-4 text-[#0755e9]" />}
                label="completionRate"
                value={analytics.completionRate}
                delta="+3 from last month"
              />
              <StatCard
                icon={<CalendarClock className="h-4 w-4 text-[#0755e9]" />}
                label="totalRevenue"
                value={analytics.totalRevenue.toFixed(2)}
                delta="-5% from last month"
                deltaColor="#f13e3e"
              />
              <StatCard
                icon={<BarChart3 className="h-4 w-4 text-[#0755e9]" />}
                label="activeCourses"
                value={analytics.activeCourses.toString()}
                delta="+4% from last month"
              />
            </>
          ) : (
            <p className="text-gray-500 col-span-4">
              Failed to load analytics.
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
