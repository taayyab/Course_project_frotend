"use client"

import { useState } from "react"
import { Button } from "@/components/institute/ui/button"
import { Input } from "@/components/institute/ui/input"
import { Textarea } from "@/components/institute/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/institute/ui/select"
import { Card, CardContent } from "@/components/institute/ui/card"
import { Plus, GraduationCap } from "lucide-react"

export default function CreateCoursePage() {
  const [learningObjectives, setLearningObjectives] = useState([""])
  const [additionalObjectives, setAdditionalObjectives] = useState([""])
  const [skills, setSkills] = useState([""])

  const addLearningObjective = () => {
    setLearningObjectives([...learningObjectives, ""])
  }

  const addAdditionalObjective = () => {
    setAdditionalObjectives([...additionalObjectives, ""])
  }

  const addSkill = () => {
    setSkills([...skills, ""])
  }

  const updateLearningObjective = (index: number, value: string) => {
    const updated = [...learningObjectives]
    updated[index] = value
    setLearningObjectives(updated)
  }

  const updateAdditionalObjective = (index: number, value: string) => {
    const updated = [...additionalObjectives]
    updated[index] = value
    setAdditionalObjectives(updated)
  }

  const updateSkill = (index: number, value: string) => {
    const updated = [...skills]
    updated[index] = value
    setSkills(updated)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create New Course</h1>
              <p className="text-gray-600">Fill in the details below to create a new course for your students.</p>
            </div>

            <form className="space-y-6">
              {/* Course Title and Instructor Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                  <Input placeholder="e.g. Advanced Python for Data Science" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor name</label>
                  <Input placeholder="e.g. Dr. Sara Chen" className="w-full" />
                </div>
              </div>

              {/* Course Duration and Course Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Duration</label>
                  <Input placeholder="e.g. 8 Weeks" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Price</label>
                  <Input placeholder="Full Legal Name" className="w-full" />
                </div>
              </div>

              {/* Language and Course Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Type</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Course Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Course Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Description</label>
                <Textarea
                  placeholder="Full Course Introduction and Summary"
                  className="w-full min-h-[120px] resize-none"
                />
              </div>

              {/* Learning Objectives */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
                <div className="space-y-3">
                  {learningObjectives.map((objective, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Add Learning Objectives"
                        value={objective}
                        onChange={(e) => updateLearningObjective(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addLearningObjective}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 px-3"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Learning Objectives */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
                <div className="space-y-3">
                  {additionalObjectives.map((objective, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Add Learning Objectives"
                        value={objective}
                        onChange={(e) => updateAdditionalObjective(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addAdditionalObjective}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 px-3"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills You'll Learn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills You'll Learn</label>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Add Learning Objectives"
                        value={skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" onClick={addSkill} size="sm" className="bg-blue-600 hover:bg-blue-700 px-3">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button type="button" variant="outline" className="px-6 bg-transparent">
                  Save Draft
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
                  Create Course
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
