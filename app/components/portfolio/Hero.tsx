"use client"

import Image from "next/image"
import { Github, Mail, Phone, Linkedin, Download, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-background" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 glow-purple">
              <Image
                src="/images/ravi-profile.jpeg"
                alt="Ravi Saini"
                width={320}
                height={320}
                className="w-full h-full object-cover object-center scale-110"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg glow-purple-sm">
              <span className="text-white font-bold text-sm text-center leading-tight">Full Stack<br/>Dev</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center lg:text-left flex-1">
            <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">Hello, I&apos;m</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-gradient">Ravi Saini</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              Java Full Stack Developer
            </h2>
            <p className="text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Passionate about building responsive websites and REST APIs. Skilled in Java, Spring Boot, React, and MySQL. 
              Always eager to solve real-world problems through code.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <a 
                href="mailto:ravisaini61245@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">ravisaini61245@gmail.com</span>
              </a>
              <a 
                href="tel:+917877940013"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 7877940013</span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0">
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary/50 hover:bg-primary/10">
                <a href="https://github.com/Ravisaini0" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary/50 hover:bg-primary/10">
                <a href="https://www.linkedin.com/in/ravi-saini-822300396" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute  left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
