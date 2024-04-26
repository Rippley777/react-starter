import React from 'react';

interface HeroProps {}

const Hero: React.FC<HeroProps> = (_props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${require('../../images/energy.jpg')})`,
      }}
      className="h-56 bg-cover bg-center bg-no-repeat text-right p-10 opacity-90"
    >
      <span className="text-[8vw] text-white font-bold drop-shadow-[0_1.3px_1.3px_rgba(0,0,0,0.9)]">
        <h1>The testing ground 🧨🚧</h1>
      </span>
    </div>
  );
};

export default Hero;
