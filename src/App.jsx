import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import SmoothScroll from './components/SmoothScroll'
import MatrixHover from './components/MatrixHover'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sparkles from './components/Sparkles'
import AboutPage from './pages/AboutPage'
import ExperiencesPage from './pages/ExperiencesPage'
import ProjectsPage from './pages/ProjectsPage'
import GalleryPage from './pages/GalleryPage'
import BlogPage from './pages/BlogPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SmoothScroll />
      <div className="relative min-h-screen overflow-hidden text-white">
        {/* Global starry sparkles — sits behind all content, fixed to viewport */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <Sparkles density={0.00006} />
        </div>

        <MatrixHover />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<AboutPage />} />
          </Routes>
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}
