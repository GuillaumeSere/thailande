'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import data from '../data/media_updated.json';
import styles from './Header.module.css';

const Header = () => {
  const { categories } = data;

  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Ajout du script pour fermer le menu après clic sur un lien
  useEffect(() => {
    const links = document.querySelectorAll(`.${styles.mobileNav} a`);
    const checkbox = document.getElementById('menu-toggle') as HTMLInputElement | null;
    const handleClick = () => {
      if (checkbox) checkbox.checked = false;
    };
    links.forEach(link => link.addEventListener('click', handleClick));
    return () => {
      links.forEach(link => link.removeEventListener('click', handleClick));
    };
  }, []);

  return (
    <header className={styles.siteHeader}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Thailande Galerie
        </Link>

        {/* --- Menu Desktop --- */}
        <ul className={styles.desktopNav}>
          {categories.map((category) => (
            <li key={category.name}>
              <Link href={`/category/${createSlug(category.name)}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* --- Menu Burger (Mobile) --- */}
        <div className={styles.burgerMenu}>
          <input id="menu-toggle" type="checkbox" className={styles.menuToggle} />
          <label htmlFor="menu-toggle" className={styles.menuLabel} aria-label="Menu">
            <span />
            <span />
            <span />
          </label>
          
          {/* --- Menu Mobile Overlay --- */}
          <ul className={styles.mobileNav}>
             {categories.map((category) => (
              <li key={category.name}>
                <Link href={`/category/${createSlug(category.name)}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;