"use client"

import dynamic from 'next/dynamic'

import Header from './(front)/Header/Header';
import Hero from './(front)/Hero/Hero';
import ProjectsList from './(front)/Projects/ProjectList';
import Contact from './(front)/Contact/Contact';
import "./front.css";

const Bubbles = dynamic(() => import("./(front)/components/Bubbles"), { ssr: false });
const GsapSmoother = dynamic(() => import('./(front)/components/GsapSmoother'), { ssr: false })

export default function Home() {
  return (
    <GsapSmoother>
      <Header />
      <div className="home relative">
        <Bubbles
          className="cursor-anim-wrapper"
          fade={30}
          strokeGray={230}
          bg={255}
        >
          <Hero />
          <ProjectsList />
          <Contact />
        </Bubbles>
      </div>
    </GsapSmoother>
  )
}
