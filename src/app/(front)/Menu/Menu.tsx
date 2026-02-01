import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

interface MenuComponentProps {
  ulClasses?: string;
  liClasses?: string;
}

export default function Menu({ ulClasses = "", liClasses = "" }: MenuComponentProps) {
  const menu = useRef<HTMLUListElement | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  useGSAP(() => {
    if (!menu.current) return;

    const links: HTMLAnchorElement[] = gsap.utils.toArray(menu.current?.querySelectorAll("a"));

    links.forEach(link => {
      if (!link) return;
      const href = link.getAttribute("href");

      if (!href) return;

      const sectionName = href.replace('#', '');
      const targetElement = document.querySelector(href);

      if (targetElement) {
        ScrollTrigger.create({
          trigger: href,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(sectionName),
          onEnterBack: () => setActiveSection(sectionName),
        });
      }

      link.addEventListener("click", e => {
        e.preventDefault();
        gsap.to(window, { scrollTo: { y: href, offsetY: 0 }, duration: 1 });
      });
    })
  }, {});

  return (
    <>
      <ul className={ulClasses} ref={menu}>
        {
          ["Home", "Projects", "Contact"].map((entry, key) => {
            const isActive = activeSection === entry.toLowerCase();
            return (
              <li className={`menu-entry menu-entry-${key + 1} text-xl ${liClasses}`} key={key}>
                <a href={`#${entry.toLowerCase()}`} className="flex gap-2 items-center">
                  <span className={`${isActive ? 'font-normal' : ''}`}>
                    {entry}
                  </span>
                </a>
              </li>
            );
          })
        }
      </ul>
    </>
  )
}