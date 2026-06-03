"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Github, ShoppingCart, Shirt, Database } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { API_BASE_URL, absoluteAssetUrl } from "@/lib/api"

const projects = [
  {
    icon: Shirt,
    title: "Laundry Management System",
    description: "A comprehensive Spring Boot backend system featuring authentication, user management, admin controls, delivery management, shop management, and complete order handling workflows.",
    technologies: ["Spring Boot", "Java", "MySQL", "REST API"],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce application with product catalog, shopping cart, user authentication, and secure checkout process. Built with modern web technologies.",
    technologies: ["React", "Spring Boot", "MySQL", "Bootstrap"],
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Database,
    title: "CRUD Application",
    description: "A Login and Registration System built using Java Servlets, JSP, and MySQL. Implements secure authentication and complete CRUD operations for user management.",
    technologies: ["Java Servlets", "JSP", "MySQL", "JDBC"],
    color: "from-purple-500/20 to-pink-500/20"
  }
]

const defaultProjectTitles = new Set(projects.map((project) => project.title))

export default function Projects() {
  const [items, setItems] = useState(projects)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const backendProjects = data
            .filter((project) => !defaultProjectTitles.has(project.title))
            .map((project) => ({
            icon: Database,
            title: project.title,
            description: project.description,
            technologies: String(project.technologies || "").split(",").map((tech) => tech.trim()).filter(Boolean),
            color: "from-purple-500/20 to-pink-500/20",
            githubUrl: project.githubUrl,
            liveUrl: project.liveUrl,
            imageUrl: project.imageUrl,
          }))
          setItems([...projects, ...backendProjects])
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I&apos;ve worked on, showcasing my skills in full-stack development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project: any, index) => (
            <Card key={index} className="project-card bg-card border-border/50 card-hover group overflow-hidden relative flex h-full flex-col">
              {/* Gradient accent */}
              <div className={`mobile-hide-accent absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <CardContent className="flex flex-1 flex-col p-6">
                <ProjectMedia project={project} priority={index < 3} />
                <h3 className="font-semibold text-foreground text-lg mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, techIndex: number) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs font-normal bg-secondary/50">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-1 gap-3 px-6 pb-6 pt-0 sm:grid-cols-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={project.liveUrl ? "w-full border-primary/50 hover:bg-primary/10" : "w-full border-primary/50 hover:bg-primary/10 sm:col-span-2"}
                  asChild
                >
                  <a href={project.githubUrl || "https://github.com/Ravisaini0"} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Work
                  </a>
                </Button>
                {project.liveUrl && (
                  <Button variant="default" size="sm" className="w-full" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Projects Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            More projects available on my GitHub profile
          </p>
          <Button variant="outline" className="border-primary/50 hover:bg-primary/10" asChild>
            <a href="https://github.com/Ravisaini0" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Visit GitHub Profile
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

function ProjectMedia({ project, priority }: { project: any; priority?: boolean }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const imageUrl = project.imageUrl && !failed ? absoluteAssetUrl(project.imageUrl) : ""

  return (
    <div className={`project-media mobile-solid-surface relative mb-5 aspect-video w-full overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br ${project.color}`}>
      {imageUrl ? (
      <img
        src={imageUrl}
        alt={project.title}
        loading={priority ? "eager" : "lazy"}
        decoding="sync"
        className={`absolute inset-0 h-full w-full object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
      ) : null}
      {(!imageUrl || !loaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
          <project.icon className="h-10 w-10 text-primary" />
        </div>
      )}
    </div>
  )
}
