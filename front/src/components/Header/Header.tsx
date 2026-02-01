import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import Logo from '../../assets/svg/logo.svg?react';
import MenuListComponent from '../Menu/Menu.tsx';
import HeaderAnim from './HeaderAnim.ts';

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
          <Logo className="logo w-10 h-auto invisible -translate-y-full" />
        </div>
        <div className="header__menu ">
          <MenuListComponent ulClasses="flex gap-4" liClasses="invisible -translate-y-full" />
        </div>
      </div>
    </header>
  )
}

export default Header;