"use client"

import { useRef, useState, useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { projectsListSlider, ProjectsListScrollTrigger } from "./inc/animations";

gsap.registerPlugin(ScrollTrigger);

interface Category {
  _id: string;
  title: string;
  slug: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  link: string;
  categories: Category[];
}

export default function ProjectsList() {
  const projectsContainer = useRef<HTMLDivElement | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlideIndex(index);
  }

  useGSAP(() => {
    if (projects.length === 0) return;

    projectsListSlider(projectsContainer.current, handleSlideChange);

    ProjectsListScrollTrigger();

  }, { scope: projectsContainer, dependencies: [projects] });

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects?featured=true');

        if (!response.ok) {
          console.error('Failed to fetch projects');
          return;
        }

        const data = await response.json();
        setProjects(data.projects);
      }
      catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    void fetchProjects();
  }, [])

  return (
    <div ref={projectsContainer} id="projects" className={`projects relative z-0 container h-screen overflow-hidden`}>
      <div className="projectList__prev-btn absolute left-1/3 top-2/3 md:top-1/2 md:left-5 md:-translate-y-1/2 xl:left-60 z-10 cursor-pointer">
        <span className="block w-6 h-6 border border-gray-900 border-r-0 border-b-0 -rotate-45"></span>
      </div>

      {projects.map((project) => (
        <div id={project._id} key={project._id} className={`project category-${project.categories?.[0]?.slug || 'default'} absolute h-full w-full flex justify-center items-center select-none`}>
          <div className="project__container w-75 md:w-120 flex flex-col justify-center gap-2">
            <h2 className="project__title font-normal text-center leading-12">{project.title}</h2>
            {project.categories.length && project.categories.map((category) => (
              <p className="text-sm text-center" key={category._id}>{category.title}</p>
            ))}
            <div className="project__body flex flex-col gap-1">
              <div className="project__description">
                 <div dangerouslySetInnerHTML={{ __html: project.description }} />
              </div>
              <div className="project__link flex justify-end">
                <a href={project.link}
                   target="_blank"
                   className="block font-normal">
                  Go to <span className="inline-flex underlined">website</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="projectList__next-btn absolute right-1/3 top-2/3 md:top-1/2 md:right-5 md:-translate-y-1/2 xl:right-60 z-10 cursor-pointer">
        <span className="block w-6 h-6 border border-gray-900 border-r-0 border-b-0 rotate-135"></span>
      </div>
      <div className="projectMenu flex flex-col gap-1 md:gap-2 text-right absolute bottom-25 sm:bottom-0 right-2">
        {projects.map((project, index) => (
          <div className={`projectMenu__item ${project.categories?.[0]?.slug || 'default'}`} key={index}>
            <span className={`${index === currentSlideIndex ? 'active-project' : 'cursor-pointer'}`}>{project.title}</span>
          </div>
        ))
        }
      </div>
    </div>
  )
}
