'use client';

import Link from 'next/link';


const Header = () => {
  return (
    <header className='flex items-center gap-5 bg-blue-800 p-2'>
      <Link href="/" className='font-semibold text-xl text-white'>
        Taskify
      </Link>
    </header>
   );
}

export default Header;
