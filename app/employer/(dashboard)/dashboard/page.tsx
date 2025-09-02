"use client";

import { useEffect, useState } from "react";
import {
  Medal,
  MapPin,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/employer/ui/card";
import { Button } from "@/components/employer/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/employer/ui/avatar";
import { Badge } from "@/components/employer/ui/badge";
import { getMatchedCandidates } from "@/lib/employer.api";

interface Candidate {
  studentId: string;
  studentDetails: {
    firstName: string;
    lastName: string;
    location: string;
    skills: string[];
    userId: {
      profilePicture: string;
    };
  };
  matchPercentage: number;
  jobTitle: string;
}

export default function DashboardPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const data = await getMatchedCandidates();
      setCandidates(data);
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  return (
    <div>
      <section className="mt-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </section>

      <section className="mt-6 grid gap-6">
        <Card className="bg-white/90 border-[#e6e7ef] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">AI-Matched Candidates</CardTitle>
            <Button variant="outline" className="h-8 text-sm border-[#e6e7ef]">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5 md:grid-cols-2">
              {loading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 bg-gray-200 animate-pulse rounded-lg"
                  />
                ))
              ) : candidates.length > 0 ? (
                candidates.map((candidate) => (
                  <CandidateCard key={candidate.studentId} candidate={candidate} />
                ))
              ) : (
                <p className="text-gray-500">No matched candidates found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Card className="border-[#e6e7ef] bg-white">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={candidate.studentDetails.userId?.profilePicture}
              alt={`${candidate.studentDetails.firstName} ${candidate.studentDetails.lastName}`}
            />
            <AvatarFallback>
              {candidate.studentDetails.firstName[0]}
              {candidate.studentDetails.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">
              {candidate.studentDetails.firstName} {candidate.studentDetails.lastName}
            </div>
            <div className="text-sm text-[#5f5f5f]">
              {candidate.jobTitle}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-[#3f3f3f]">
          <div className="flex items-center gap-2">
            <Medal className="h-4 w-4 text-[#0f5ff2]" />
            <span className="text-[#5f5f5f]">Matched</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#0f5ff2]" />
            <span className="text-[#5f5f5f]">
              {candidate.studentDetails.location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-full bg-[#ff9500]/15 px-2 py-1 text-xs text-[#3f3f3f]">
              <Star className="h-3 w-3 text-[#ff9500]" />
              {candidate.matchPercentage.toFixed(0)}% match
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.studentDetails.skills?.slice(0, 4).map((skill, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="rounded-full bg-[#f5f7ff] text-[#3f3f3f] border border-[#e6e7ef]"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
