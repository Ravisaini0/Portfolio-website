import Hero from "./components/portfolio/Hero"
import About from "./components/portfolio/About"
import Skills from "./components/portfolio/Skills"
import Projects from "./components/portfolio/Projects"
import Certificates from "./components/portfolio/Certificates"
import Contact from "./components/portfolio/Contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
    </>
  )
}
