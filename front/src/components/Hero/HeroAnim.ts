import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSDevTools } from 'gsap/GSDevTools';

gsap.registerPlugin(SplitText, TextPlugin, ScrollTrigger, GSDevTools);

export default class HeroAnim {
  #container: HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.#container = container;
  }

  init() {
    this.heroAnimation()
    this.scrollLogo()
    this.scrollMenu()
  }

  async heroAnimation() {
    try {
      await document.fonts.ready;
      const subtitle: HTMLHeadingElement | null = this.#container?.querySelector(".hero__subtitle");

      const splitTitle = SplitText.create(".hero__title", {
        type: "chars, words",
      });

      gsap.set(".hero__description p:first-child", {
        autoAlpha: 0,
        x: -50,
      });
      gsap.set(".hero__description p:last-child", {
        autoAlpha: 0,
        x: 50,
      });

      const tl = gsap.timeline({
        defaults: {
          duration: 1,
        }
      });

      tl
        .from(splitTitle.chars, {
          autoAlpha: 0,
          stagger: 0.1,
          y: 20,
          ease: "back(4)"
        })
        .to(splitTitle.chars[0], {
          x: 4,
        }, "<0.2")
        .to(".hero__subtitle", {
          text: subtitle?.dataset.text,
        }, "<1")
        .to(".hero__description p:first-child", {
          autoAlpha: 1,
          x: 0,
          ease: "back.out"
        }, "<0.5")
        .to(".hero__description p:last-child", {
          autoAlpha: 1,
          x: 0,
          ease: "back.out"
        }, "<0.5")
        .to(".hero__logo svg", {
          yPercent: -140,
          autoAlpha: 1,
          duration: 0.5,
          ease: "back.out"
        })
    } catch (err) {
      console.warn(err)
    }
  }

  scrollLogo() {
    gsap
      .to(".hero__logo", {
        yPercent: 140,
        autoAlpha: 0,
        ease: "back.in",
        scrollTrigger: {
          trigger: ".hero__logo",
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      })
  }

  scrollMenu() {
    const heroMenu: HTMLDivElement | null = this.#container.querySelector('.hero__menu');
    gsap
      .to(".menu-entry", {
        x: 200,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.in",
        scrollTrigger: {
          trigger: ".hero__menu",
          start: `top 85%`,
          end: `bottom 85%`,
          toggleActions: "play none none reverse",
          onEnter: () => {
            heroMenu?.classList.add("isHidden")
          },
          onEnterBack: () => {
            heroMenu?.classList.remove("isHidden")
          }
        }
      })
  }
}