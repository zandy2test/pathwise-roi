export interface EducationPath {
  id: string
  name: string
  type: string
  averageCost: number
  duration: number // in years
  averageStartingSalary: number
  salaryGrowthRate: number
}

export const educationTypes = [
  { id: "college", name: "College/University" },
  { id: "trade", name: "Trade School" },
  { id: "bootcamp", name: "Coding Bootcamp" },
  { id: "certification", name: "Professional Certification" },
  { id: "graduate", name: "Graduate School" },
]

export const educationPaths: Record<string, EducationPath[]> = {
  college: [
    {
      id: "cs",
      name: "Computer Science",
      type: "college",
      averageCost: 120000,
      duration: 4,
      averageStartingSalary: 85000,
      salaryGrowthRate: 0.06,
    },
    {
      id: "business",
      name: "Business Administration",
      type: "college",
      averageCost: 100000,
      duration: 4,
      averageStartingSalary: 65000,
      salaryGrowthRate: 0.04,
    },
    {
      id: "engineering",
      name: "Engineering",
      type: "college",
      averageCost: 130000,
      duration: 4,
      averageStartingSalary: 75000,
      salaryGrowthRate: 0.05,
    },
  ],
  trade: [
    {
      id: "electrician",
      name: "Electrician",
      type: "trade",
      averageCost: 25000,
      duration: 2,
      averageStartingSalary: 55000,
      salaryGrowthRate: 0.03,
    },
    {
      id: "plumber",
      name: "Plumber",
      type: "trade",
      averageCost: 20000,
      duration: 1.5,
      averageStartingSalary: 50000,
      salaryGrowthRate: 0.035,
    },
    {
      id: "hvac",
      name: "HVAC Technician",
      type: "trade",
      averageCost: 22000,
      duration: 1.5,
      averageStartingSalary: 48000,
      salaryGrowthRate: 0.04,
    },
  ],
  bootcamp: [
    {
      id: "web-dev",
      name: "Web Development",
      type: "bootcamp",
      averageCost: 15000,
      duration: 0.5,
      averageStartingSalary: 70000,
      salaryGrowthRate: 0.08,
    },
    {
      id: "data-science",
      name: "Data Science",
      type: "bootcamp",
      averageCost: 18000,
      duration: 0.75,
      averageStartingSalary: 80000,
      salaryGrowthRate: 0.07,
    },
    {
      id: "ux-design",
      name: "UX/UI Design",
      type: "bootcamp",
      averageCost: 12000,
      duration: 0.5,
      averageStartingSalary: 65000,
      salaryGrowthRate: 0.06,
    },
  ],
}
