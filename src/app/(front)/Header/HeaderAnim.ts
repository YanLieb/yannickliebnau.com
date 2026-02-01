import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class HeaderAnim {
  container: HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.container = container
  }

  init() {
    this.scrollHeader();
    this.scrollLogo();
    this.scrollMenu();
  }

  scrollHeader() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: `-=${window.scrollY}px`,
        end: `-=${window.scrollY}px`,
        toggleActions: "play none none reverse",
      }
    })

    gsap.set(this.container, {
      backgroundColor: "transparent",
      boxShadow: "0 0 0 rgba(0,0,0,0)"
    })

    tl
      .to(this.container, {
        backgroundColor: 'white',
      })
      .to(this.container, {
        boxShadow: '0 0 1px rgba(0,0,0,0.5)',
      }, ">")
  }

  scrollLogo() {
    gsap.to(".header__logo .logo", {
      autoAlpha: 1,
      yPercent: 100,
      ease: "back",
      scrollTrigger: {
        trigger: ".header__logo",
        start: `-=${window.scrollY}px`,
        end: `-=${window.scrollY}px`,
        toggleActions: "play none none reverse",
      }
    })
  }

  scrollMenu() {
    gsap.to(".header__menu .menu-entry", {
      autoAlpha: 1,
      yPercent: 100,
      stagger: 0.1,
      ease: "back",
      scrollTrigger: {
        trigger: ".header__menu",
        start: `-=${window.scrollY}px`,
        end: `-=${window.scrollY}px`,
        toggleActions: "play none none reverse",
      }
    })

  }
}