import Hero from '../components/Hero'
import StarJourney from '../components/StarJourney'
import About from '../components/About'
import Experience from '../components/Experience'
import Achievements from '../components/Achievements'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import TechStack from '../components/TechStack'
import Certifications from '../components/Certifications'
import Education from '../components/Education'
import Contact from '../components/Contact'
import SectionDivider from '../components/SectionDivider'

export default function AboutPage() {
  return (
    <>
      <Hero />
      <StarJourney />
      <SectionDivider label="01 · about" />
      <About />
      <SectionDivider label="02 · experience" />
      <Experience />
      <SectionDivider label="03 · achievements" />
      <Achievements />
      <SectionDivider label="04 · projects" />
      <Projects />
      <SectionDivider label="05 · skills" />
      <Skills />
      <TechStack />
      <SectionDivider label="06 · certifications" />
      <Certifications />
      <Education />
      <SectionDivider label="07 · contact" />
      <Contact />
    </>
  )
}
