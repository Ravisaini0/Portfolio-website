"use client"

import { Briefcase, GraduationCap, Code2, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Know <span className="text-gradient">Who I Am</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I&apos;m a Java Full Stack Developer with hands-on experience in building web applications 
            and REST APIs. I have a strong foundation in both frontend and backend technologies, 
            and I&apos;m passionate about creating efficient, scalable solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((item, index) => (
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
            <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0 glow-purple-sm"></div>
              <div className="flex-1 pl-6 -ml-[7px]">
                <h4 className="font-semibold text-foreground">API Integration Specialist</h4>
                <p className="text-primary text-sm mb-2">Growbizz.io | Dec 2025 - Mar 2026</p>
                <p className="text-muted-foreground text-sm">
                  Integrated APIs and collaborated with team members while maintaining a professional 
                  and positive work attitude. Demonstrated strong technical expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
