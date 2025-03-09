'use client';

import { Boxes, CheckCheck, Star, Sun } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import type { FC } from 'react';

import { cn } from '@/libs/utils';

const iconMap = {
  default: null,
  complited: <CheckCheck className="h-3 w-3" />,
  favorites: <Star className="h-3 w-3" />,
  day: <Sun className="h-3 w-3" />,
  work: <Boxes className="h-3 w-3" />,
};

type Marker = keyof typeof iconMap;

interface NavItemProps {
  slug: string;
  title: string;
  count?: number;
  marker?: Marker;
}

const NavItem: FC<NavItemProps> = ({ slug, title, count, marker = 'default' }) => {
  const params = useParams();
  const pathname = usePathname();

  const getActiveNav = () => {
    return slug === params.slug || pathname.includes(slug);
  };

  return (
    <li
      className={cn(
        'border-l-4 border-transparent transition hover:bg-cyan-500/20',
        getActiveNav() && 'border-l-4 border-cyan-600 bg-blue-300/10 hover:border-cyan-500/80',
      )}
    >
      <Link


        href={`/category/${slug}`}
        key={slug}
        className={cn('flex items-center gap-3 px-6 py-3')}
      >
        {iconMap[marker]}
        {title}
        {!!count && (
          <span className="ml-auto text-[12px] font-semibold text-zinc-700">{count}</span>
        )}
      </Link>
    </li>
  );
};

export default NavItem;
