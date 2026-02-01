import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LinkedInIcon from '../../assets/svg/icon-linkedin.svg?react';
import GithubIcon from '../../assets/svg/icon-github.svg?react';
import MailIcon from '../../assets/svg/icon-mail.svg?react';


gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const container = useRef(null)
  const contactLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yannickliebnau/',
      icon: <LinkedInIcon />
    },
    {
      name: 'Github',
      url: 'https://github.com/YanLieb',
      icon: <GithubIcon />
    },
    {
      name: 'Mail',
      url: 'mailto:contact@yannickliebnau.com',
      icon: <MailIcon />
    }
  ]

  useGSAP(() => {
    if (!container.current) return;

    gsap.from('.contact__link', {
      autoAlpha: 0,
      y: 50,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.contact__link',
        toggleActions: 'play pause pause reverse'
      }
    })


  }, { scope: container })

  return (
    <div id="contact" className="contact" ref={container}>
      <div className="contact__container h-screen container flex flex-col items-center">
        <div className="contact__links flex flex-col sm:flex-row items-center justify-center gap-5 h-full">
          {contactLinks && contactLinks.map(contact => (
            <div className="contact__link" key={contact.name}>
              <a href={contact.url} target="_blank" rel="noopener">
                {contact.icon}
              </a>
            </div>
          ))}
        </div>
        <div className="contact__copyright text-center text-xs pb-2">
          <p className="">© 2025 - Design by Xcaret Castillo Sanchez ~ Dev by Yannick Liebnau. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}