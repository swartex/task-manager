'use client';

import { FC } from 'react';

interface TagProps {
  title: string;
}

const Tag: FC<TagProps> = ({ title }) => {
  return (
    <span className="rounded-lg bg-green-700/80 px-[7px] py-[2px] text-[10px] text-white">
      {title}
    </span>
  );
};

export default Tag;
