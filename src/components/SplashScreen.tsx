import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Complete transition after fade out animation (3 seconds total)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`min-h-screen min-h-[100dvh] flex items-center justify-center transition-opacity duration-500 fixed inset-0 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#E9F0FB',
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0),
          radial-gradient(circle at 2px 2px, rgba(0,0,0,0.01) 1px, transparent 0)
        `,
        backgroundSize: '20px 20px, 40px 40px'
      }}
    >
      <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 
          className="text-6xl sm:text-7xl md:text-8xl font-bold text-black font-space-grotesk animate-pulse"
          style={{
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}
        >
          Cooplix
        </h1>
        <p 
          className="text-gray-500 text-lg sm:text-xl font-light mt-4 font-space-grotesk"
          style={{
            letterSpacing: '0.01em'
          }}
        >
          Play with purpose
        </p>
      </div>
    </div>
  );
};