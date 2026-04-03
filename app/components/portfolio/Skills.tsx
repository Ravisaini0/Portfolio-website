"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 75 },
      { name: "Bootstrap", level: 85 },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Java", level: 85 },
      { name: "Spring Boot", level: 80 },
      { name: "REST APIs", level: 80 },
      { name: "Servlets", level: 75 },
      { name: "JDBC", level: 75 },
    ]
  },
  {
    title: "Database & Tools",
    skills: [
      { name: "MySQL", level: 80 },
      { name: "Git", level: 75 },
      { name: "GitHub", level: 80 },
      { name: "VS Code", level: 85 },
      { name: "Eclipse", level: 80 },
    ]
  }
]

const allSkills = [
  "HTML", "CSS", "JavaScript", "React", "Bootstrap",
  "Java", "Spring Boot", "REST APIs", "MySQL",
  "Git", "GitHub", "OOP", "JDBC"
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-gradient">Technical Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of technical skills spanning frontend, backend, and database technologies.
          </p>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {allSkills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-card border border-border/50 rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Skill Categories with Progress */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-card border-border/50 card-hover">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-6 text-center text-gradient">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
