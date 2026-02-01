import { useRef, useMemo, useState, useCallback } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import projectsData from './inc/projects.json';

import Project from './Project';
import ProjectsMenu from "./ProjectsMenu";
import { projectsListSlider, ProjectsListScrollTrigger } from "./inc/animations";

gsap.registerPlugin(ScrollTrigger);
export default function ProjectsList() {
  const projectsContainer = useRef<HTMLDivElement | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const CATEGORIES = Object.keys(projectsData.projects) as Array<keyof typeof projectsData.projects>;

  const setActiveCategory = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const categoryId = parseInt(e.currentTarget.getAttribute('data-category-id') ?? '1')
    setActiveCategoryId(categoryId);
    setCurrentSlideIndex(0)
  }, []);

  const categoryData = useMemo(() =>
    CATEGORIES.map((category, index) => {
      const id = index + 1;
      const categoryLower = category.toLowerCase().replace(/[/\s]/g, '-');
      const projects = projectsData.projects[category];

      return {
        id,
        category,
        isActive: activeCategoryId === id,
        projectsContainer: (
          <div key={id} className={`projects__list projects__${categoryLower} h-full`}>
            {projects.map((project, index) => (
              <Project
                key={index}
                id={`project-${category.toLowerCase().replace(/[/\s]/g, '-')}-${index}`}
                category={category.toLowerCase().replace(/[/\s]/g, '-')}
                projectData={project}
                currentSlideIndex={currentSlideIndex}
              />
            ))}
          </div>
        ),
        projectsMenu: (
          <ProjectsMenu key={id} category={category} projects={projectsData.projects[category]} currentSlideIndex={currentSlideIndex} />
        ),
        categoryMenuItem: (
          <div key={id} className="projects__categories-menu__item">
            {activeCategoryId === id ? (
              <span className="active-category">{category}</span>
            ) : (
              <a href={`#category-${id}`} data-category-id={id} onClick={setActiveCategory}>{category}</a>
            )}
          </div>
        )
      };
    }), [activeCategoryId, currentSlideIndex, CATEGORIES, setActiveCategory]
  );

  useGSAP(() => {
    projectsListSlider(projectsContainer.current, (index) => {
      setCurrentSlideIndex(index);
    });
    ProjectsListScrollTrigger();

  }, { scope: projectsContainer, dependencies: [activeCategoryId] });

  return (
    <div ref={projectsContainer} id="projects" className={`projects relative z-0 container h-screen overflow-hidden`}>
      <div className="projects__prev-btn absolute left-1/3 top-2/3 md:top-1/2 md:start-2 md:-translate-y-1/2 z-10 cursor-pointer">
        <span className="block w-6 h-6 border border-gray-900 border-r-0 border-b-0 -rotate-45"></span>
      </div>
      {categoryData.map((data) => data.isActive && data.projectsContainer)}
      <div className="projects__next-btn absolute right-1/3 top-2/3 md:top-1/2 md:end-2 md:-translate-y-1/2 z-10 cursor-pointer">
        <span className="block w-6 h-6 border border-gray-900 border-r-0 border-b-0 rotate-135"></span>
      </div>
      <div className="projects__categories-menu flex flex-wrap gap-2 absolute bottom-0 w-full flex-col lg:flex-row lg:justify-center lg:items-center">
        {categoryData.map((data) => data.categoryMenuItem)}
      </div>
      {categoryData.map((data) => data.isActive && data.projectsMenu)}
    </div>
  )
}
