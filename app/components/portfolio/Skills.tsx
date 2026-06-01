"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { API_BASE_URL } from "@/lib/api"

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
      { name: "GitHub", level: 80 },
      { name: "VS Code", level: 85 },
      { name: "Eclipse", level: 80 },
    ]
  }
]

const allSkills = [
  "HTML", "CSS", "JavaScript", "React", "Bootstrap",
  "Java", "Spring Boot", "REST APIs", "MySQL",
  "GitHub", "OOP", "JDBC"
]

export default function Skills() {
  const [content, setContent] = useState({
    skillsTitle: "My Technical Skills",
    skillsDescription: "A comprehensive set of technical skills spanning frontend, backend, and database technologies.",
    frontendSkills: "HTML:90,CSS:85,JavaScript:80,React:75,Bootstrap:85",
    backendSkills: "Java:85,Spring Boot:80,REST APIs:80,Servlets:75,JDBC:75",
    toolsSkills: "MySQL:80,GitHub:80,VS Code:85,Eclipse:80",
  })

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/profile`).then((res) => (res.ok ? res.json() : null)),
      fetch(`${API_BASE_URL}/api/skills`).then((res) => (res.ok ? res.json() : [])),
    ])
      .then(([profile, skills]) => {
        if (profile) setContent((prev) => ({ ...prev, ...profile }))
        if (Array.isArray(skills) && skills.length > 0) {
          const byCategory = skills.reduce((acc, skill) => {
            const category = skill.category || "Other"
            acc[category] = [...(acc[category] || []), `${skill.name}:${skill.level || 70}`]
            return acc
          }, {} as Record<string, string[]>)

          setContent((prev) => ({
            ...prev,
            frontendSkills: byCategory.Frontend?.join(",") || prev.frontendSkills,
            backendSkills: byCategory.Backend?.join(",") || prev.backendSkills,
            toolsSkills: (byCategory["Database & Tools"] || byCategory.Tools)?.join(",") || prev.toolsSkills,
          }))
        }
      })
      .catch(() => {})
  }, [])

  const parseSkills = (value: string) =>
    value.split(",").map((item) => {
      const [name, level] = item.split(":")
      return { name: name?.trim() || "Skill", level: Number(level) || 70 }
    }).filter((skill) => skill.name)

  const dynamicCategories = useMemo(() => [
    { title: "Frontend", skills: parseSkills(content.frontendSkills) },
    { title: "Backend", skills: parseSkills(content.backendSkills) },
    { title: "Database & Tools", skills: parseSkills(content.toolsSkills) },
  ], [content.frontendSkills, content.backendSkills, content.toolsSkills])

  const dynamicAllSkills = dynamicCategories.flatMap((category) => category.skills.map((skill) => skill.name))
  const titleParts = content.skillsTitle.split(" ")
  const titlePrefix = titleParts.slice(0, -2).join(" ") || "My"
  const titleAccent = titleParts.slice(-2).join(" ") || "Technical Skills"

  return (
    <section id="skills" className="py-20 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {titlePrefix} <span className="text-gradient">{titleAccent}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content.skillsDescription}
          </p>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {dynamicAllSkills.map((skill, index) => (
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
          {dynamicCategories.map((category, categoryIndex) => (
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
