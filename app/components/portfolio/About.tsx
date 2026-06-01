"use client"

import { useEffect, useState } from "react"
import { Briefcase, GraduationCap, Code2, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { API_BASE_URL } from "@/lib/api"

const highlights = [
  {
    icon: Briefcase,
    title: "Professional Experience",
    description: "Java Full Stack Developer Trainee at Technoglobe, working on real-world projects and REST APIs."
  },
  {
    icon: Code2,
    title: "Technical Skills",
    description: "Proficient in Java, Spring Boot, React, and MySQL with hands-on project experience."
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "B.Com from R.N. Ruia Government College, continuously learning new technologies."
  },
  {
    icon: Users,
    title: "Team Player",
    description: "Strong teamwork and communication skills developed through collaborative projects."
  }
]

export default function About() {
  const [aboutItems, setAboutItems] = useState(highlights)
  const [experiences, setExperiences] = useState([{
    id: 1,
    title: "API Integration Specialist",
    companyPeriod: "Growbizz.io | Dec 2025 - Mar 2026",
    description: "Integrated APIs and collaborated with team members while maintaining a professional and positive work attitude. Demonstrated strong technical expertise.",
  }])
  const [content, setContent] = useState({
    aboutTitle: "Know Who I Am",
    aboutDescription: "I'm a Java Full Stack Developer with hands-on experience in building web applications and REST APIs. I have a strong foundation in both frontend and backend technologies, and I'm passionate about creating efficient, scalable solutions.",
    highlightExperience: highlights[0].description,
    highlightSkills: highlights[1].description,
    highlightEducation: highlights[2].description,
    highlightTeamwork: highlights[3].description,
    workTitle: "API Integration Specialist",
    workCompanyPeriod: "Growbizz.io | Dec 2025 - Mar 2026",
    workDescription: "Integrated APIs and collaborated with team members while maintaining a professional and positive work attitude. Demonstrated strong technical expertise.",
  })

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/profile`).then((res) => (res.ok ? res.json() : null)),
      fetch(`${API_BASE_URL}/api/about-items`).then((res) => (res.ok ? res.json() : [])),
      fetch(`${API_BASE_URL}/api/experiences`).then((res) => (res.ok ? res.json() : [])),
    ])
      .then(([profile, items, work]) => {
        if (profile) setContent((prev) => ({ ...prev, ...profile }))
        if (Array.isArray(items) && items.length > 0) {
          const iconMap = [Briefcase, Code2, GraduationCap, Users]
          setAboutItems(items.map((item, index) => ({
            icon: iconMap[index % iconMap.length],
            title: item.title,
            description: item.description,
          })))
        }
        if (Array.isArray(work) && work.length > 0) setExperiences(work)
      })
      .catch(() => {})
  }, [])

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.aboutTitle.split(" ").slice(0, -2).join(" ") || "Know"} <span className="text-gradient">{content.aboutTitle.split(" ").slice(-2).join(" ") || "Who I Am"}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {content.aboutDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {aboutItems.map((item, index) => (
            <Card key={index} className="bg-card border-border/50 card-hover group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-foreground mb-8 text-center">
            Work <span className="text-gradient">Experience</span>
          </h3>
          <div className="space-y-6">
            {experiences.map((experience) => (
            <div key={experience.id} className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0 glow-purple-sm"></div>
              <div className="flex-1 pl-6 -ml-[7px]">
                <h4 className="font-semibold text-foreground">{experience.title}</h4>
                <p className="text-primary text-sm mb-2">{experience.companyPeriod}</p>
                <p className="text-muted-foreground text-sm">
                  {experience.description}
                </p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
