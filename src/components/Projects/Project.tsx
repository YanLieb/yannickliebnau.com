import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type ProjectData = {
  title: string;
  description: string;
  infos: string;
  link: string;
  repo_link?: string;
};

type ProjectProps = {
  id: string;
  category: string;
  projectData: ProjectData;
  currentSlideIndex: number;
};

export default function Project({ id, category, projectData, currentSlideIndex }: ProjectProps) {
  const projectRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!projectRef.current) return;
    const projectLinks: HTMLAnchorElement[] = gsap.utils.toArray(projectRef.current?.querySelectorAll('.project__link a'));

    projectLinks?.forEach(link => {
      const underlined = link?.querySelector(".underlined")
      link?.addEventListener('mouseenter', () => {
        gsap.to(underlined, {
          "--width": "100%",
          "--left": "100%",
          ease: "expo",
          duration: 1,
        })
      });

      link?.addEventListener('mouseleave', () => {
        gsap.to(underlined, {
          "--width": "0",
          "--left": "-100%",
          ease: "expo",
          duration: 1,
        })
      })
    })


  }, { scope: projectRef, dependencies: [currentSlideIndex] });

  return (
    <div id={id} ref={projectRef} className={`project category-${category} absolute h-full w-full flex justify-center items-center select-none`}>
      <div className="project__container w-75 md:w-120 flex flex-col justify-center gap-2">
        <h2 className="project__title font-normal text-center leading-12">{projectData.title}</h2>
        <div className="project__body flex flex-col gap-1">
          <div className="project__description">
            <p>{projectData.description}</p>
          </div>
          <div className="project__infos">
            <p>{projectData.infos}</p>
          </div>
          <div className="project__link flex justify-end">
            <a href={projectData.link}
              target="_blank"
              className="block font-normal">
              Go to <span className="inline-flex underlined">website</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}