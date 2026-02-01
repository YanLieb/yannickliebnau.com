import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";


gsap.registerPlugin(Observer, SplitText);

export function projectsListSlider(container: HTMLDivElement | null, onSlideChange?: (index: number) => void) {
  if (!container) return;

  const projects = gsap.utils.toArray<HTMLDivElement>('.project');
  const wrap = gsap.utils.wrap(0, projects.length);
  let currentIndex = 0;
  let isAnimating = false;

  gsap.set(projects[0], { xPercent: 0 });
  gsap.set(projects[0]?.querySelector('.project__title'), { autoAlpha: 1 });
  gsap.set(projects[0]?.querySelector('.project__body'), { autoAlpha: 1 });
  projects.slice(1).forEach(project => {
    gsap.set(project, { xPercent: 100 });
  });
  const slide = (followingIndex: number) => {
    followingIndex = wrap(followingIndex);
    isAnimating = true;

    const totalSlides = projects.length;
    const forwardDistance = (followingIndex - currentIndex + totalSlides) % totalSlides;
    const backwardDistance = (currentIndex - followingIndex + totalSlides) % totalSlides;
    const shouldGoForward = forwardDistance <= backwardDistance;
    const calculatedDirection = shouldGoForward ? -1 : 1;

    const currentProject = projects[currentIndex];
    const currentTitle = currentProject?.querySelector('.project__title');
    const currentBody = currentProject?.querySelector('.project__body');

    const followingProject = projects[followingIndex];
    const followingTitle = followingProject?.querySelector('.project__title');
    const followingBody = followingProject?.querySelector('.project__body');

    if (!currentProject || !followingProject) {
      console.warn("No project found");
      isAnimating = false;
      return;
    }

    const splitCurrentTitle = new SplitText(currentTitle, { type: "words" });
    const splitCurrentBody = new SplitText(currentBody, { type: "lines" });
    const splitFollowingTitle = new SplitText(followingTitle, { type: "words" });
    const splitFollowingBody = new SplitText(followingBody, { type: "lines" });

    gsap.set(followingProject, {
      xPercent: calculatedDirection === -1 ? 100 : -100
    });
    gsap.set(splitFollowingTitle.words, {
      y: -50,
      autoAlpha: 0
    });
    gsap.set(splitFollowingBody.lines, {
      x: shouldGoForward ? 50 : -50,
      autoAlpha: 0
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "back.inOut(1.7)"
      },
      onComplete: () => {
        splitCurrentTitle.revert();
        splitCurrentBody.revert();
        splitFollowingTitle.revert();
        splitFollowingBody.revert();

        currentIndex = followingIndex;
        onSlideChange?.(currentIndex);
        isAnimating = false;
      }
    })

    tl
      .to(splitCurrentTitle.words, {
        y: -50,
        autoAlpha: 0,
        stagger: 0.1
      })
      .to(splitCurrentBody.lines, {
        x: shouldGoForward ? -50 : 50,
        autoAlpha: 0,
        stagger: 0.1
      }, "<")
      .to(currentProject, {
        xPercent: 100 * calculatedDirection,
      })
      .to(followingProject, {
        xPercent: 0
      }, "<")
      .to(splitFollowingTitle.words, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1
      })
      .to(splitFollowingBody.lines, {
        x: 0,
        autoAlpha: 1,
        stagger: 0.1
      }, "<")
  }

  Observer.create({
    target: container,
    type: "pointer",
    onRight: () => {
      if (isAnimating) return;
      slide(currentIndex - 1);
    },
    onLeft: () => {
      if (isAnimating) return;
      slide(currentIndex + 1);
    },
    onClick: (self) => {
      if (isAnimating) return;

      const target = self.event.target as HTMLElement;
      if (target.closest('.projectList__next-btn')) {
        slide(currentIndex + 1);
      } else if (target.closest('.projectList__prev-btn')) {
        slide(currentIndex - 1);
      }

      const menuEntries = document.querySelectorAll('.projectMenu .projectMenu__item');
      menuEntries.forEach((entry, index) => {
        if (target.closest('.projectMenu__item') === entry) {
          if (index === currentIndex) return;
          slide(index);
        }
      });
    }
  });
}

export function ProjectsListScrollTrigger() {
  gsap.set(".projectMenu__item, .project__container,.projectList__prev-btn, .projectList__next-btn", {
    autoAlpha: 0,
  });

  gsap.to(".projectMenu__item", {
    autoAlpha: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".projectMenu",
      start: "top 90%",
      end: "bottom 10%",
      toggleActions: "play none none reverse",
    }
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".project__container",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    }
  });

  tl
    .to(".project__container", {
      autoAlpha: 1,
    })
    .fromTo(".projectList__next-btn, .projectList__prev-btn", {
      y: 50,
    }, {
      autoAlpha: 1,
      y: 0
    }, "<")

}
