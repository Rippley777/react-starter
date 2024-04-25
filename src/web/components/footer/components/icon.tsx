import React from 'react';
import { twMerge } from 'tailwind-merge';

type FooterIconProps = {
  icon: React.ElementType;
  name: string;
};

const iconSize = 32;

const footerIconProps = {
  size: iconSize,
};

const FooterIcon = ({ icon, name }: FooterIconProps) => {
  return (
    <div className="flex group h-10 items-center">
      <div
        style={{ maxWidth: 32 }}
        className={twMerge(
          `absolute cursor-none text-xs font-semibold transition-opacity duration-500 opacity-0 group-hover:opacity-100 
            ${name.length > 9 && !name.includes('-') && ' translate-x-[-15px]'}
            ${name.length < 5 && ' translate-x-[7px]'}`,
        )}
      >
        {name.replaceAll('-', ' ')}
      </div>
      <div className="transition-opacity duration-500 group-hover:opacity-30">
        {React.createElement(icon, footerIconProps)}
      </div>
    </div>
  );
};

export default FooterIcon;
