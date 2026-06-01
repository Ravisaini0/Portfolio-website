"use client"

import { useEffect, useMemo, useState } from "react"
import type React from "react"
import { ArrowLeft, Award, Briefcase, Eye, FileText, ImagePlus, LogOut, Mail, Pencil, Save, Sparkles, Trash2, Upload, UserRound, Wrench } from "lucide-react"
import { API_BASE_URL, absoluteAssetUrl } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Profile = {
  fullName: string
  role: string
  bio: string
  email: string
  phone: string
  location: string
  githubUrl: string
  linkedinUrl: string
  profileImageUrl: string
  aboutTitle: string
  aboutDescription: string
  highlightExperience: string
  highlightSkills: string
  highlightEducation: string
  highlightTeamwork: string
  workTitle: string
  workCompanyPeriod: string
  workDescription: string
  skillsTitle: string
  skillsDescription: string
  frontendSkills: string
  backendSkills: string
  toolsSkills: string
}

type Project = {
  id?: number
  title: string
  description: string
  technologies: string
  githubUrl: string
  liveUrl: string
  imageUrl: string
  section?: string
}

type Certificate = {
  id?: number
  title: string
  name?: string
  issuer: string
  duration: string
  location: string
  date: string
  type: string
  description: string
  imageUrl: string
}

type ContactMessage = {
  id: number
  name: string
  email: string
  phone: string
  company?: string
  subject?: string
  message: string
}

type AboutItem = {
  id?: number
  title: string
  description: string
  icon: string
}

type Experience = {
  id?: number
  title: string
  companyPeriod: string
  description: string
}

type Skill = {
  id?: number
  category: string
  name: string
  level: number
}

const emptyProfile: Profile = {
  fullName: "",
  role: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  githubUrl: "",
  linkedinUrl: "",
  profileImageUrl: "",
  aboutTitle: "",
  aboutDescription: "",
  highlightExperience: "",
  highlightSkills: "",
  highlightEducation: "",
  highlightTeamwork: "",
  workTitle: "",
  workCompanyPeriod: "",
  workDescription: "",
  skillsTitle: "",
  skillsDescription: "",
  frontendSkills: "",
  backendSkills: "",
  toolsSkills: "",
}

const emptyProject: Project = {
  title: "",
  description: "",
  technologies: "",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
  section: "work",
}

const emptyCertificate: Certificate = {
  title: "",
  issuer: "",
  duration: "",
  location: "",
  date: "",
  type: "",
  description: "",
  imageUrl: "",
}

const emptyAboutItem: AboutItem = {
  title: "",
  description: "",
  icon: "briefcase",
}

const emptyExperience: Experience = {
  title: "",
  companyPeriod: "",
  description: "",
}

const emptySkill: Skill = {
  category: "AI Tools",
  name: "",
  level: 80,
}

const defaultProjectTitles = new Set([
  "Laundry Management System",
  "E-Commerce Platform",
  "CRUD Application",
])

export default function AdminDashboardPage() {
  const [token, setToken] = useState("")
  const [profile, setProfile] = useState<Profile>(emptyProfile)
  const [projectForm, setProjectForm] = useState<Project>(emptyProject)
  const [certificateForm, setCertificateForm] = useState<Certificate>(emptyCertificate)
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [aboutItems, setAboutItems] = useState<AboutItem[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [aboutForm, setAboutForm] = useState<AboutItem>(emptyAboutItem)
  const [experienceForm, setExperienceForm] = useState<Experience>(emptyExperience)
  const [skillForm, setSkillForm] = useState<Skill>(emptySkill)
  const [sectionStatus, setSectionStatus] = useState<Record<string, string>>({})
  const [busySection, setBusySection] = useState("")

  const authHeaders = useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token])

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (!savedToken) {
      window.location.href = "/admin"
      return
    }
    setToken(savedToken)
  }, [])

  useEffect(() => {
    if (token) loadDashboard()
  }, [token])

  const setMessage = (section: string, message: string) => {
    setSectionStatus((prev) => ({ ...prev, [section]: message }))
  }

  const loadDashboard = async () => {
    try {
      const [profileRes, projectsRes, certificatesRes, messagesRes, aboutRes, experienceRes, skillsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/profile`),
        fetch(`${API_BASE_URL}/api/projects`),
        fetch(`${API_BASE_URL}/api/certificates`),
        fetch(`${API_BASE_URL}/api/contact`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/api/about-items`),
        fetch(`${API_BASE_URL}/api/experiences`),
        fetch(`${API_BASE_URL}/api/skills`),
      ])

      if (profileRes.ok) setProfile({ ...emptyProfile, ...(await profileRes.json()) })
      if (projectsRes.ok) setProjects(await projectsRes.json())
      if (certificatesRes.ok) setCertificates(await certificatesRes.json())
      if (messagesRes.ok) setMessages(await messagesRes.json())
      if (aboutRes.ok) setAboutItems(await aboutRes.json())
      if (experienceRes.ok) setExperiences(await experienceRes.json())
      if (skillsRes.ok) setSkills(await skillsRes.json())
    } catch {
      setMessage("dashboard", "Backend se data load nahi hua. Backend running check karo.")
    }
  }

  const saveProfileSection = async (section: string, successMessage: string) => {
    setBusySection(section)
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(profile),
      })
      setMessage(section, res.ok ? successMessage : "Save failed. Login dobara karke try karo.")
    } catch {
      setMessage(section, "Backend connection failed.")
    } finally {
      setBusySection("")
    }
  }

  const uploadFile = async (file: File, section: string) => {
    setBusySection(section)
    try {
      const data = new FormData()
      data.append("file", file)
      const res = await fetch(`${API_BASE_URL}/api/uploads`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      })
      if (!res.ok) {
        const text = await res.text()
        setMessage(section, text || "Image upload failed.")
        return ""
      }
      const result = await res.json()
      setMessage(section, "Image uploaded. Ab save button dabao.")
      return result.url as string
    } catch {
      setMessage(section, "Image upload failed. Backend running check karo.")
      return ""
    } finally {
      setBusySection("")
    }
  }

  const getProjectSection = (project: Project) => {
    if (project.section === "project" || project.section === "work") return project.section
    return defaultProjectTitles.has(project.title) ? "project" : "work"
  }

  const projectItems = projects.filter((project) => getProjectSection(project) === "project")
  const workItems = projects.filter((project) => getProjectSection(project) === "work")

  const saveProject = async (section: "project" | "work") => {
    setBusySection(section)
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ ...projectForm, section }),
      })
      setMessage(section, res.ok ? (projectForm.id ? "Saved item updated successfully." : "Saved item added successfully.") : "Save failed.")
      if (res.ok) {
        setProjectForm({ ...emptyProject, section })
        loadDashboard()
      }
    } finally {
      setBusySection("")
    }
  }

  const saveAboutItem = async () => {
    const res = await fetch(`${API_BASE_URL}/api/about-items`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(aboutForm),
    })
    setMessage("about", res.ok ? (aboutForm.id ? "About item updated successfully." : "About item added successfully.") : "About item save failed.")
    if (res.ok) {
      setAboutForm(emptyAboutItem)
      loadDashboard()
    }
  }

  const saveExperience = async () => {
    const res = await fetch(`${API_BASE_URL}/api/experiences`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(experienceForm),
    })
    setMessage("experience", res.ok ? (experienceForm.id ? "Work experience updated successfully." : "Work experience added successfully.") : "Work experience save failed.")
    if (res.ok) {
      setExperienceForm(emptyExperience)
      loadDashboard()
    }
  }

  const saveSkill = async () => {
    const res = await fetch(`${API_BASE_URL}/api/skills`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(skillForm),
    })
    setMessage("skills", res.ok ? (skillForm.id ? "Skill updated successfully." : "Skill added successfully.") : "Skill save failed.")
    if (res.ok) {
      setSkillForm(emptySkill)
      loadDashboard()
    }
  }

  const saveCertificate = async () => {
    setBusySection("certificates")
    let res: Response
    if (certificateFile) {
      const data = new FormData()
      data.append("file", certificateFile)
      data.append("name", certificateForm.title)
      data.append("issuer", certificateForm.issuer)
      data.append("date", certificateForm.date)
      data.append("duration", certificateForm.duration)
      data.append("location", certificateForm.location)
      data.append("type", certificateForm.type)
      data.append("description", certificateForm.description)
      if (certificateForm.id) data.append("id", String(certificateForm.id))
      res = await fetch(`${API_BASE_URL}/api/certificates/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      })
    } else {
      res = await fetch(`${API_BASE_URL}/api/certificates`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(certificateForm),
      })
    }

    setMessage("certificates", res.ok ? (certificateForm.id ? "Certificate updated successfully." : "Certificate saved successfully.") : "Certificate save failed.")
    setBusySection("")
    if (res.ok) {
      setCertificateForm(emptyCertificate)
      setCertificateFile(null)
      loadDashboard()
    }
  }

  const deleteItem = async (path: string, section: string) => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    setMessage(section, res.ok ? "Deleted successfully." : "Delete failed.")
    if (res.ok) loadDashboard()
  }

  const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/admin"
  }

  if (!token) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/60 bg-card/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a href="/" className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </a>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Portfolio content, uploads, messages aur public website ka control center.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                View site
              </a>
            </Button>
            <Button variant="outline" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {sectionStatus.dashboard && <Status text={sectionStatus.dashboard} />}

        <Tabs defaultValue="profile" className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <TabsList className="flex h-auto flex-col items-stretch gap-2 bg-card p-2">
            <TabsTrigger value="profile" className="justify-start"><UserRound className="mr-2 h-4 w-4" />Profile</TabsTrigger>
            <TabsTrigger value="about" className="justify-start"><FileText className="mr-2 h-4 w-4" />About Section</TabsTrigger>
            <TabsTrigger value="experience" className="justify-start"><Briefcase className="mr-2 h-4 w-4" />Work Experience</TabsTrigger>
            <TabsTrigger value="skills" className="justify-start"><Wrench className="mr-2 h-4 w-4" />Skills Section</TabsTrigger>
            <TabsTrigger value="projects" className="justify-start"><Sparkles className="mr-2 h-4 w-4" />Projects</TabsTrigger>
            <TabsTrigger value="work" className="justify-start"><Upload className="mr-2 h-4 w-4" />Work Uploads</TabsTrigger>
            <TabsTrigger value="certificates" className="justify-start"><Award className="mr-2 h-4 w-4" />Certificates</TabsTrigger>
            <TabsTrigger value="messages" className="justify-start"><Mail className="mr-2 h-4 w-4" />Messages</TabsTrigger>
          </TabsList>

          <div className="min-w-0">
            <TabsContent value="profile">
              <AdminSection
                title="Profile Details"
                description="Hero section, contact info aur social links yahan se update honge."
                status={sectionStatus.profile}
                actionLabel="Save profile"
                busy={busySection === "profile"}
                onSave={() => saveProfileSection("profile", "Profile saved successfully.")}
              >
                <FieldGrid>
                  <TextField label="Full name" value={profile.fullName} onChange={(value) => setProfile({ ...profile, fullName: value })} />
                  <TextField label="Role" value={profile.role} onChange={(value) => setProfile({ ...profile, role: value })} />
                  <TextField label="Email" value={profile.email} onChange={(value) => setProfile({ ...profile, email: value })} />
                  <TextField label="Phone" value={profile.phone} onChange={(value) => setProfile({ ...profile, phone: value })} />
                  <TextField label="Location" value={profile.location} onChange={(value) => setProfile({ ...profile, location: value })} />
                  <TextField label="GitHub URL" value={profile.githubUrl} onChange={(value) => setProfile({ ...profile, githubUrl: value })} />
                  <TextField label="LinkedIn URL" value={profile.linkedinUrl} onChange={(value) => setProfile({ ...profile, linkedinUrl: value })} />
                  <FileField
                    label="Profile image"
                    current={profile.profileImageUrl}
                    onUpload={async (file) => {
                      const url = await uploadFile(file, "profile")
                      if (url) setProfile({ ...profile, profileImageUrl: url })
                    }}
                  />
                  <TextAreaField className="md:col-span-2" label="Hero bio" value={profile.bio} rows={5} onChange={(value) => setProfile({ ...profile, bio: value })} />
                </FieldGrid>
              </AdminSection>
            </TabsContent>

            <TabsContent value="about">
              <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
                <AdminSection
                  title={aboutForm.id ? "Edit About Item" : "Add About Item"}
                  description="About cards add, edit/update, delete kar sakte ho."
                  status={sectionStatus.about}
                  actionLabel={aboutForm.id ? "Update item" : "Add item"}
                  busy={busySection === "about"}
                  onSave={saveAboutItem}
                >
                  <div className="space-y-4">
                    <TextField label="Section title" value={profile.aboutTitle} onChange={(value) => setProfile({ ...profile, aboutTitle: value })} />
                    <TextAreaField label="Section description" value={profile.aboutDescription} rows={4} onChange={(value) => setProfile({ ...profile, aboutDescription: value })} />
                    <Button type="button" variant="outline" onClick={() => saveProfileSection("about", "About heading saved successfully.")}>
                      Save heading
                    </Button>
                    <TextField label="Card title" value={aboutForm.title} onChange={(value) => setAboutForm({ ...aboutForm, title: value })} />
                    <TextAreaField label="Card description" value={aboutForm.description} onChange={(value) => setAboutForm({ ...aboutForm, description: value })} />
                    <TextField label="Icon name" value={aboutForm.icon} onChange={(value) => setAboutForm({ ...aboutForm, icon: value })} />
                    {aboutForm.id && <Button type="button" variant="outline" onClick={() => setAboutForm(emptyAboutItem)}>Cancel edit</Button>}
                  </div>
                </AdminSection>
                <ListPanel title="About Items">
                  {aboutItems.length === 0 && <EmptyText>No about items yet.</EmptyText>}
                  {aboutItems.map((item) => (
                    <AdminListItem
                      key={item.id}
                      title={item.title}
                      subtitle={item.description}
                      onEdit={() => {
                        setAboutForm(item)
                        setMessage("about", "Editing selected about item. Update fields and save.")
                      }}
                      onDelete={() => deleteItem(`/api/about-items/${item.id}`, "about")}
                    />
                  ))}
                </ListPanel>
              </div>
            </TabsContent>

            <TabsContent value="experience">
              <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
                <AdminSection
                  title={experienceForm.id ? "Edit Work Experience" : "Add Work Experience"}
                  description="Multiple work experience entries add/edit/delete kar sakte ho."
                  status={sectionStatus.experience}
                  actionLabel={experienceForm.id ? "Update experience" : "Add experience"}
                  busy={busySection === "experience"}
                  onSave={saveExperience}
                >
                  <div className="space-y-4">
                    <TextField label="Work title" value={experienceForm.title} onChange={(value) => setExperienceForm({ ...experienceForm, title: value })} />
                    <TextField label="Company and period" value={experienceForm.companyPeriod} onChange={(value) => setExperienceForm({ ...experienceForm, companyPeriod: value })} />
                    <TextAreaField label="Description" value={experienceForm.description} rows={5} onChange={(value) => setExperienceForm({ ...experienceForm, description: value })} />
                    {experienceForm.id && <Button type="button" variant="outline" onClick={() => setExperienceForm(emptyExperience)}>Cancel edit</Button>}
                  </div>
                </AdminSection>
                <ListPanel title="Work Experience Entries">
                  {experiences.length === 0 && <EmptyText>No experience entries yet.</EmptyText>}
                  {experiences.map((experience) => (
                    <AdminListItem
                      key={experience.id}
                      title={experience.title}
                      subtitle={experience.companyPeriod}
                      onEdit={() => {
                        setExperienceForm(experience)
                        setMessage("experience", "Editing selected experience. Update fields and save.")
                      }}
                      onDelete={() => deleteItem(`/api/experiences/${experience.id}`, "experience")}
                    />
                  ))}
                </ListPanel>
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
                <AdminSection
                  title={skillForm.id ? "Edit Skill" : "Add Skill"}
                  description="Individual skill add/edit/delete karo. Category examples: Frontend, Backend, Database & Tools, AI Tools."
                  status={sectionStatus.skills}
                  actionLabel={skillForm.id ? "Update skill" : "Add skill"}
                  busy={busySection === "skills"}
                  onSave={saveSkill}
                >
                  <div className="space-y-4">
                    <TextField label="Section title" value={profile.skillsTitle} onChange={(value) => setProfile({ ...profile, skillsTitle: value })} />
                    <TextAreaField label="Section description" value={profile.skillsDescription} onChange={(value) => setProfile({ ...profile, skillsDescription: value })} />
                    <Button type="button" variant="outline" onClick={() => saveProfileSection("skills", "Skills heading saved successfully.")}>
                      Save heading
                    </Button>
                    <TextField label="Category" value={skillForm.category} onChange={(value) => setSkillForm({ ...skillForm, category: value })} />
                    <TextField label="Skill name" value={skillForm.name} onChange={(value) => setSkillForm({ ...skillForm, name: value })} />
                    <TextField label="Level %" value={String(skillForm.level)} onChange={(value) => setSkillForm({ ...skillForm, level: Number(value) || 0 })} />
                    {skillForm.id && <Button type="button" variant="outline" onClick={() => setSkillForm(emptySkill)}>Cancel edit</Button>}
                  </div>
                </AdminSection>
                <ListPanel title="Skills">
                  {skills.length === 0 && <EmptyText>No skills yet.</EmptyText>}
                  {skills.map((skill) => (
                    <AdminListItem
                      key={skill.id}
                      title={`${skill.name} (${skill.level}%)`}
                      subtitle={skill.category}
                      onEdit={() => {
                        setSkillForm(skill)
                        setMessage("skills", "Editing selected skill. Update fields and save.")
                      }}
                      onDelete={() => deleteItem(`/api/skills/${skill.id}`, "skills")}
                    />
                  ))}
                </ListPanel>
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
                <AdminSection title={projectForm.id ? "Edit Project" : "Add Project"} description="Portfolio ke project cards yahan se manage karo." status={sectionStatus.project} actionLabel={projectForm.id ? "Update project" : "Save project"} busy={busySection === "project"} onSave={() => saveProject("project")}>
                  <div className="space-y-4">
                    <TextField label="Title" value={projectForm.title} onChange={(value) => setProjectForm({ ...projectForm, title: value })} />
                    <TextAreaField label="Description" value={projectForm.description} onChange={(value) => setProjectForm({ ...projectForm, description: value })} />
                    <TextField label="Technologies" value={projectForm.technologies} onChange={(value) => setProjectForm({ ...projectForm, technologies: value })} />
                    <TextField label="GitHub URL" value={projectForm.githubUrl} onChange={(value) => setProjectForm({ ...projectForm, githubUrl: value })} />
                    <TextField label="Live URL" value={projectForm.liveUrl} onChange={(value) => setProjectForm({ ...projectForm, liveUrl: value })} />
                    <FileField label="Project image" current={projectForm.imageUrl} onUpload={async (file) => {
                      const url = await uploadFile(file, "project")
                      if (url) setProjectForm({ ...projectForm, imageUrl: url })
                    }} />
                    {projectForm.id && (
                      <Button variant="outline" type="button" onClick={() => setProjectForm({ ...emptyProject, section: "project" })}>
                        Cancel edit
                      </Button>
                    )}
                  </div>
                </AdminSection>
                <ListPanel title="Projects">
                  {projectItems.length === 0 && <EmptyText>No projects yet.</EmptyText>}
                  {projectItems.map((project) => (
                    <AdminListItem
                      key={project.id}
                      title={project.title}
                      subtitle={project.technologies}
                      image={absoluteAssetUrl(project.imageUrl)}
                      onEdit={() => {
                        setProjectForm({ ...project, section: "project" })
                        setMessage("project", "Editing selected project. Update fields and save.")
                      }}
                      onDelete={() => deleteItem(`/api/projects/${project.id}`, "project")}
                    />
                  ))}
                </ListPanel>
              </div>
            </TabsContent>

            <TabsContent value="work">
              <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
                <AdminSection title={projectForm.id ? "Edit Work Upload" : "Add Work Upload"} description="Client work, live websites aur uploaded work yahan manage karo." status={sectionStatus.work} actionLabel={projectForm.id ? "Update work" : "Save work"} busy={busySection === "work"} onSave={() => saveProject("work")}>
                  <div className="space-y-4">
                    <TextField label="Work title" value={projectForm.title} onChange={(value) => setProjectForm({ ...projectForm, title: value })} />
                    <TextAreaField label="Description" value={projectForm.description} onChange={(value) => setProjectForm({ ...projectForm, description: value })} />
                    <TextField label="Technologies" value={projectForm.technologies} onChange={(value) => setProjectForm({ ...projectForm, technologies: value })} />
                    <TextField label="GitHub URL" value={projectForm.githubUrl} onChange={(value) => setProjectForm({ ...projectForm, githubUrl: value })} />
                    <TextField label="Live website URL" value={projectForm.liveUrl} onChange={(value) => setProjectForm({ ...projectForm, liveUrl: value })} />
                    <FileField label="Work image" current={projectForm.imageUrl} onUpload={async (file) => {
                      const url = await uploadFile(file, "work")
                      if (url) setProjectForm({ ...projectForm, imageUrl: url })
                    }} />
                    {projectForm.id && (
                      <Button variant="outline" type="button" onClick={() => setProjectForm({ ...emptyProject, section: "work" })}>
                        Cancel edit
                      </Button>
                    )}
                  </div>
                </AdminSection>
                <ListPanel title="Work Uploads">
                  {workItems.length === 0 && <EmptyText>No work uploads yet.</EmptyText>}
                  {workItems.map((project) => (
                    <AdminListItem
                      key={project.id}
                      title={project.title}
                      subtitle={project.technologies}
                      image={absoluteAssetUrl(project.imageUrl)}
                      onEdit={() => {
                        setProjectForm({ ...project, section: "work" })
                        setMessage("work", "Editing selected work item. Update fields and save.")
                      }}
                      onDelete={() => deleteItem(`/api/projects/${project.id}`, "work")}
                    />
                  ))}
                </ListPanel>
              </div>
            </TabsContent>

            <TabsContent value="certificates">
              <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
                <AdminSection title={certificateForm.id ? "Edit Certificate / Experience" : "Add Certificate / Experience"} description="Certificate image/PDF upload karo ya experience entry save/update karo." status={sectionStatus.certificates} actionLabel={certificateForm.id ? "Update certificate" : "Save certificate"} busy={busySection === "certificates"} onSave={saveCertificate}>
                  <div className="space-y-4">
                    <TextField label="Title" value={certificateForm.title} onChange={(value) => setCertificateForm({ ...certificateForm, title: value })} />
                    <TextField label="Issuer" value={certificateForm.issuer} onChange={(value) => setCertificateForm({ ...certificateForm, issuer: value })} />
                    <TextField label="Date" value={certificateForm.date} onChange={(value) => setCertificateForm({ ...certificateForm, date: value })} />
                    <TextField label="Duration" value={certificateForm.duration} onChange={(value) => setCertificateForm({ ...certificateForm, duration: value })} />
                    <TextField label="Location" value={certificateForm.location} onChange={(value) => setCertificateForm({ ...certificateForm, location: value })} />
                    <TextField label="Type" value={certificateForm.type} onChange={(value) => setCertificateForm({ ...certificateForm, type: value })} />
                    <FileField label="Certificate file" current={certificateFile?.name || certificateForm.imageUrl} onUpload={async (file) => {
                      setCertificateFile(file)
                      setMessage("certificates", "File selected. Save certificate dabao.")
                    }} />
                    <TextAreaField label="Description" value={certificateForm.description} onChange={(value) => setCertificateForm({ ...certificateForm, description: value })} />
                    {certificateForm.id && (
                      <Button variant="outline" type="button" onClick={() => {
                        setCertificateForm(emptyCertificate)
                        setCertificateFile(null)
                      }}>
                        Cancel edit
                      </Button>
                    )}
                  </div>
                </AdminSection>
                <ListPanel title="Certificates & Experience">
                  {certificates.length === 0 && <EmptyText>No certificates uploaded yet.</EmptyText>}
                  {certificates.map((cert) => (
                    <AdminListItem
                      key={cert.id}
                      title={cert.title || cert.name || "Certificate"}
                      subtitle={cert.issuer || cert.type}
                      image={absoluteAssetUrl(cert.imageUrl)}
                      onEdit={() => {
                        setCertificateForm({
                          id: cert.id,
                          title: cert.title || cert.name || "",
                          name: cert.name,
                          issuer: cert.issuer || "",
                          duration: cert.duration || "",
                          location: cert.location || "",
                          date: cert.date || "",
                          type: cert.type || "",
                          description: cert.description || "",
                          imageUrl: cert.imageUrl || "",
                        })
                        setCertificateFile(null)
                        setMessage("certificates", "Editing selected certificate. Update fields and save.")
                      }}
                      onDelete={() => deleteItem(`/api/certificates/${cert.id}`, "certificates")}
                    />
                  ))}
                </ListPanel>
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <ListPanel title="Contact Form Messages">
                {sectionStatus.messages && <Status text={sectionStatus.messages} />}
                {messages.length === 0 && <EmptyText>No contact messages yet.</EmptyText>}
                {messages.map((message) => (
                  <div key={message.id} className="rounded-lg border border-border/50 bg-background/50 p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{message.name}</h3>
                        <p className="text-sm text-muted-foreground">{message.email} | {message.phone}</p>
                        {message.company && <p className="text-xs text-muted-foreground">{message.company}</p>}
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => deleteItem(`/api/contact/${message.id}`, "messages")}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm font-medium">{message.subject}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{message.message}</p>
                  </div>
                ))}
              </ListPanel>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  )
}

function AdminSection({ title, description, status, actionLabel, busy, onSave, children }: {
  title: string
  description: string
  status?: string
  actionLabel: string
  busy: boolean
  onSave: () => void
  children: React.ReactNode
}) {
  return (
    <Card className="bg-card">
      <CardContent className="space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <Button onClick={onSave} disabled={busy}>
            <Save className="mr-2 h-4 w-4" />
            {busy ? "Saving..." : actionLabel}
          </Button>
        </div>
        {status && <Status text={status} />}
        {children}
      </CardContent>
    </Card>
  )
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>
}

function TextField({ label, value, className = "", onChange }: { label: string; value?: string; className?: string; onChange: (value: string) => void }) {
  return (
    <label className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      <Input value={value ?? ""} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function TextAreaField({ label, value, rows = 4, className = "", onChange }: { label: string; value?: string; rows?: number; className?: string; onChange: (value: string) => void }) {
  return (
    <label className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      <Textarea rows={rows} value={value ?? ""} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function FileField({ label, current, onUpload }: { label: string; current?: string; onUpload: (file: File) => void }) {
  return (
    <label className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <Input type="file" accept="image/*,.pdf" onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onUpload(file)
        }} />
        <ImagePlus className="h-5 w-5 text-primary" />
      </div>
      {current && <p className="break-all text-xs text-muted-foreground">Current: {current}</p>}
    </label>
  )
}

function ListPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="bg-card">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="space-y-3">{children}</div>
      </CardContent>
    </Card>
  )
}

function Status({ text }: { text: string }) {
  return <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">{text}</div>
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return <p className="rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground">{children}</p>
}

function AdminListItem({ title, subtitle, image, onEdit, onDelete }: { title: string; subtitle?: string; image?: string; onEdit?: () => void; onDelete: () => void }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="flex min-w-0 items-center gap-4 rounded-lg border border-border/50 bg-background/50 p-3">
      {image && !imageFailed && (
        <img
          src={image}
          alt=""
          className="h-14 w-14 shrink-0 rounded object-cover"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">{title}</h3>
        {subtitle && <p className="break-words text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-1">
        {onEdit && (
          <Button size="icon" variant="ghost" onClick={onEdit} aria-label="Edit">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        <Button size="icon" variant="ghost" onClick={onDelete} aria-label="Delete">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
