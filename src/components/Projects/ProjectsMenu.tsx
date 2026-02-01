type ProjectData = {
  title: string;
  description: string;
  infos: string;
  link: string;
  repo_link?: string;
};

type ProjectsMenuProps = {
  category: string;
  projects: ProjectData[];
  currentSlideIndex: number;
}

export default function ProjectsMenu({ category, projects, currentSlideIndex }: ProjectsMenuProps) {

  return (
    <div className="projects__menu flex flex-col gap-1 md:gap-2 text-right absolute bottom-25 sm:bottom-0 right-2">
      {projects.map((project, index) => (
        <div className={`projects__menu-item ${category.toLowerCase().replace(/[/\s]/g, '-')}`} key={index}>
          <span className={`${index === currentSlideIndex ? 'active-project' : 'cursor-pointer'}`}>{project.title}</span>
        </div>
      ))
      }
    </div>
  )
}