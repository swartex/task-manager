'use client';

import { cn } from '@/libs/utils';
import { Boxes, CheckCheck, Star, Sun } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC } from 'react';

const iconMap = {
  "default": null,
  "complited": <CheckCheck className='w-3 h-3' />,
  "favorites": <Star className='w-3 h-3' />,
  "day": <Sun className='w-3 h-3' />,
  "work": <Boxes className='w-3 h-3' />,
};

type Marker = keyof typeof iconMap;


interface NavItemProps {
  id: string; // example: id
  title: string;
  count?: number;
  marker?: Marker
}

const NavItem: FC<NavItemProps> = ({id, title, count, marker = 'default' }) => {
  const params = useParams();


  // FIXME: need fix active element
  return (
    <li
      className={cn(
        'border-l-4 border-transparent transition hover:bg-cyan-500/20',
        id === params?.categoryId &&
          'border-l-4 border-cyan-600 bg-blue-300/10 hover:border-cyan-500/80',
      )}
    >
      <Link
        href={`/category/${id}`}
        key={id}
        className={cn('flex items-center gap-3 px-6 py-3')}
      >
        {iconMap[marker]}
        {title}
        {!!count && (
          <span className="ml-auto text-[12px] font-semibold text-zinc-700">
            {count}
          </span>
        )}
      </Link>
    </li>
  );
};

export default NavItem;
