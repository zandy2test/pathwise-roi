"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { educationTypes, educationPaths } from "@/lib/data"
import { GraduationCap, Wrench, Code, Award, BookOpen } from "lucide-react"

interface PathBuilderProps {
  onPathChange: (educationType: string, educationPath: string) => void
  selectedType?: string
  selectedPath?: string
}

const typeIcons = {
  college: GraduationCap,
  trade: Wrench,
  bootcamp: Code,
  certification: Award,
  graduate: BookOpen,
}

export function PathBuilder({ onPathChange, selectedType, selectedPath }: PathBuilderProps) {
  const [educationType, setEducationType] = useState(selectedType || "")
  const [educationPath, setEducationPath] = useState(selectedPath || "")

  const handleTypeChange = (type: string) => {
    setEducationType(type)
    setEducationPath("") // Reset path when type changes
    onPathChange(type, "")
  }

  const handlePathChange = (path: string) => {
    setEducationPath(path)
    onPathChange(educationType, path)
  }

  const availablePaths = educationType ? educationPaths[educationType] || [] : []
  const selectedPathData = availablePaths.find((p) => p.id === educationPath)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="education-type" className="text-base font-semibold font-['Open_Sans']">
          Education Type
        </Label>
        <Select value={educationType} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full h-12 text-base">
            <SelectValue placeholder="Select your education type" />
          </SelectTrigger>
          <SelectContent>
            {educationTypes.map((type) => {
              const Icon = typeIcons[type.id as keyof typeof typeIcons]
              return (
                <SelectItem key={type.id} value={type.id} className="py-3">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-['Open_Sans']">{type.name}</span>
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      {educationType && (
        <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
          <Label htmlFor="education-path" className="text-base font-semibold font-['Open_Sans']">
            Field of Study
          </Label>
          <Select value={educationPath} onValueChange={handlePathChange}>
            <SelectTrigger className="w-full h-12 text-base">
              <SelectValue placeholder="Select your field of study" />
            </SelectTrigger>
            <SelectContent>
              {availablePaths.map((path) => (
                <SelectItem key={path.id} value={path.id} className="py-3">
                  <div className="flex flex-col items-start">
                    <span className="font-['Open_Sans'] font-medium">{path.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ${path.averageStartingSalary.toLocaleString()} avg. starting salary
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedPathData && (
        <Card className="animate-in slide-in-from-bottom-2 duration-300 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="font-['Montserrat'] font-bold text-lg">{selectedPathData.name} Overview</CardTitle>
            <CardDescription className="font-['Open_Sans']">Key details about this education path</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground font-['Open_Sans']">Duration</div>
                <div className="text-lg font-bold font-['Montserrat'] text-primary">
                  {selectedPathData.duration} {selectedPathData.duration === 1 ? "year" : "years"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-['Open_Sans']">Average Cost</div>
                <div className="text-lg font-bold font-['Montserrat'] text-primary">
                  ${selectedPathData.averageCost.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-['Open_Sans']">Starting Salary</div>
                <div className="text-lg font-bold font-['Montserrat'] text-accent">
                  ${selectedPathData.averageStartingSalary.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-['Open_Sans']">Growth Rate</div>
                <div className="text-lg font-bold font-['Montserrat'] text-accent">
                  {(selectedPathData.salaryGrowthRate * 100).toFixed(1)}%/year
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
