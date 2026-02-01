"use client"

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';


gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const container = useRef(null)
  const contactLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yannickliebnau/',
      iconSrc: '/icon-linkedin.svg'
    },
    {
      name: 'Github',
      url: 'https://github.com/YanLieb',
      iconSrc: '/icon-github.svg'
    },
    {
      name: 'Mail',
      url: 'mailto:contact@yannickliebnau.com',
      iconSrc: '/icon-mail.svg'
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
                <Image
                  src={contact.iconSrc}
                  alt={`${contact.name} icon`}
                  width={64}
                  height={64}
                />
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
