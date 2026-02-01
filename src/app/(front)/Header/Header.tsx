"use client"

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import MenuListComponent from '../Menu/Menu';
import HeaderAnim from './HeaderAnim';

function Header() {
  const header = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!header.current) return;
    const headerAnim = new HeaderAnim(header.current);
    headerAnim.init();

  }, { scope: header })
  return (
    <header ref={header} className="header py-3 fixed top-0 left-0 right-0 m-auto z-50">
      <div className="container flex justify-between">
        <div className="header__logo">
          <Image
            src="/logo.svg"
            alt="Yannick Liebnau logo"
            width={160}
            height={160}
            className="logo w-10 h-auto invisible -translate-y-full"
            priority
          />
        </div>
        <div className="header__menu ">
          <MenuListComponent ulClasses="flex gap-4" liClasses="invisible -translate-y-full" />
        </div>
      </div>
    </header>
  )
}

export default Header;
