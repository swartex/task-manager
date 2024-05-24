'use client';

import Link from 'next/link';

const navigation = [
  {
    anchor: 'Categories',
    link: '/category',
  },
  {
    anchor: 'All tasks',
    link: '/todos',
  },
];

const Header = () => {
  return (
    <header className="flex items-center gap-10 bg-blue-800 p-2">
      <Link href="/" className="text-xl font-semibold text-white">
        Taskify
      </Link>
      <nav className="w-full">
        <ul className="flex items-center gap-3">
          {navigation.map((item) => (
            <li key={item.link} className="text-sm">
              <Link href={item.link} className="text-white tracking-wider hover:opacity-75">
                {item.anchor}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
