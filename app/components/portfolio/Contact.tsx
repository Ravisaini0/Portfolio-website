"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ravisaini61245@gmail.com",
    href: "mailto:ravisaini61245@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7877940013",
    href: "tel:+917877940013"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jaipur, India",
    href: null
  }
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Ravisaini0"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ravi-saini-822300396"
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", 
      company: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)
    
  //   // Simulate form submission
  //   await new Promise(resolve => setTimeout(resolve, 1000))
    
  //   setSubmitted(true)
  //   setIsSubmitting(false)
  //   setFormData({ name: "", email: "",  phone: "",  company: "", subject: "", message: "" })
    
  //   // Reset success message after 5 seconds
  //   setTimeout(() => setSubmitted(false), 5000)
  // }
//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault()
//   setIsSubmitting(true)

//   try {
//    const res = await fetch("https://portfolio-website-backend-lzk3.onrender.com/api/contact", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(formData)
// });

//     if (res.ok) {
//       setSubmitted(true)
//       setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" })
//     }
//   } catch (error) {
//     console.error("Error:", error)
//   }

//   setIsSubmitting(false)
// }
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isSubmitting) return; // double click prevent

  setIsSubmitting(true);

  try {
    const response = await fetch(
      "https://portfolio-website-backend-lzk3.onrender.com/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    // Handle non-200 response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Message sent:", result);

    // Success UI
    setSubmitted(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    });

    // Hide success after 5 sec
    setTimeout(() => setSubmitted(false), 5000);
  } catch (error: any) {
    console.error("❌ Error:", error.message);

    alert(
      "Message send nahi hua 😕\n\nPlease try again after few seconds (server may be waking up)."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Contact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border/50">
              <CardContent className="p-6 space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Connect With Me</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-primary hover:from-purple-500/40 hover:to-pink-500/40 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-3 bg-card border-border/50">
            <CardContent className="p-6">
              {submitted ? (
                <div className="h-full flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter You Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background border-border/50 focus:border-primary"
                      />
                    </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
  <Label htmlFor="phone">Phone Number</Label>
  <Input
    id="phone"
    name="phone"
    type="tel"
    placeholder="+91 9876543210"
    value={formData.phone}
    onChange={handleChange}
    required
  />
</div>
<div className="space-y-2">
  <Label htmlFor="company">Company Name</Label>
  <Input
    id="company"
    name="company"
    placeholder="Your Company"
    value={formData.company}
    onChange={handleChange}
  />
</div>
</div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-background border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-background border-border/50 focus:border-primary"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
