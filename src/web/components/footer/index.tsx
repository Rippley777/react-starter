import React from 'react';
import {
  SiCreatereactapp,
  SiEslint,
  SiNginx,
  SiPrettier,
  SiReact,
  SiReacthookform,
  SiReactrouter,
  SiReactquery,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandDocker, TbBrandReactNative } from 'react-icons/tb';
import FooterIcon from './components/icon';

interface FooterProps {
  // Define your props here
}

const Footer: React.FC<FooterProps> = (props) => {
  const icons = [
    { icon: SiReact, name: 'react' },
    { icon: TbBrandReactNative, name: 'react-native' },
    { icon: SiTypescript, name: 'typescript' },
    { icon: SiTailwindcss, name: 'tailwindcss' },
    { icon: SiRedux, name: 'redux' },
    { icon: SiReactrouter, name: 'react-router' },
    { icon: SiReactquery, name: 'react-query' },
    { icon: SiReacthookform, name: 'react-hook-form' },
    { icon: SiEslint, name: 'eslint' },
    { icon: SiNginx, name: 'nginx' },
    { icon: SiPrettier, name: 'prettier' },
    { icon: TbBrandDocker, name: 'docker' },
    { icon: SiCreatereactapp, name: 'cra' },
  ];
  return (
    <footer className="bg-gray-800 text-white text-center p-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex flex-row gap-x-3 justify-center sm:flex-col">
          <span>&copy; {new Date().getFullYear()}</span>
          <span>Built on:</span>
        </div>
        <div className="flex flex-1 justify-between">
          {icons.map((icon) => (
            <FooterIcon key={icon.name} icon={icon.icon} name={icon.name} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
