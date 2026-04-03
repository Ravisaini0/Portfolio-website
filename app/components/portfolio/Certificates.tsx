"use client"

import { Award, Calendar, MapPin, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const certificates = [
  {
    id: 1,
    title: "Web Development in JAVA",
    issuer: "Technoglobe",
    duration: "120 Days",
    location: "Jaipur - Gopalpura",
    date: "16 Feb 2026",
    grade: "Good",
    registrationNo: "RAJ/JPR/001/1277",
    type: "Training Certificate"
  },
  {
    id: 2,
    title: "Web Page Designing & Development Program",
    issuer: "BECIL (Broadcast Engineering Consultants India Limited)",
    duration: "2 Months",
    location: "Jaipur",
    date: "22 Nov 2025",
    certificateNo: "JP/19677/13640",
    type: "Course Certificate"
  },
  {
    id: 3,
    title: "API Integration Specialist",
    issuer: "Growbizz.io",
    duration: "3 Months",
    location: "Remote",
    date: "18 Mar 2026",
    type: "Experience Letter",
    description: "Demonstrated strong technical expertise in API integration and consistently delivered quality work."
  }
]

export default function Certificates() {
  return (
    <section id="certificates" className="py-20 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Achievements
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Certificates & <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and work experience that demonstrate my commitment to continuous learning.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <Card
              key={cert.id}
              className="bg-card border-border/50 card-hover group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <CardContent className="p-6">
                {/* Certificate Type Badge */}
                <Badge 
                  variant="secondary" 
                  className="mb-4 bg-primary/10 text-primary border-0"
                >
                  {cert.type}
                </Badge>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-muted-foreground text-sm mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  {cert.issuer}
                </p>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                    {cert.duration && (
                      <>
                        <span className="text-border">|</span>
                        <span>{cert.duration}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{cert.location}</span>
                  </div>
                </div>

                {/* Grade or Registration */}
                {(cert.grade || cert.registrationNo || cert.certificateNo) && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    {cert.grade && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Grade: </span>
                        <span className="text-primary font-medium">{cert.grade}</span>
                      </p>
                    )}
                    {cert.registrationNo && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Reg No: {cert.registrationNo}
                      </p>
                    )}
                    {cert.certificateNo && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Certificate No: {cert.certificateNo}
                      </p>
                    )}
                  </div>
                )}

                {/* Description for Experience Letter */}
                {cert.description && (
                  <p className="mt-4 pt-4 border-t border-border/50 text-sm text-muted-foreground italic">
                    &quot;{cert.description}&quot;
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
