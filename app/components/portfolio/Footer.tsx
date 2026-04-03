"use client"

import { Github, Mail, Phone, Linkedin } from "lucide-react"

export default function PortfolioFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card/50 border-t border-border/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">
              Ravi Saini<span className="text-gradient">.</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Java Full Stack Developer
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:ravisaini61245@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Email</span>
            </a>
            <a
              href="tel:+917877940013"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Phone</span>
            </a>
            <a
              href="https://github.com/Ravisaini0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ravi-saini-822300396"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Designed & Developed by Ravi Saini
          </p>
          <p className="mt-2">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
