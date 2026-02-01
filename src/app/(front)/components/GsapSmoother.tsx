"use client"

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { useGSAP } from '@gsap/react';

export default function GsapSmoother({ children }: { children: React.ReactNode }) {
  const mainContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.2
    })
  }, { scope: mainContainer })

  return (
    <div ref={mainContainer} id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}
