import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface HomeScreenProps {
  onStartGame: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Trigger animations with delays
    const timer1 = setTimeout(() => setAnimationStep(1), 100);
    const timer2 = setTimeout(() => setAnimationStep(2), 300);
    const timer3 = setTimeout(() => setAnimationStep(3), 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div 
      className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        backgroundColor: '#f8f8f8',
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0),
          radial-gradient(circle at 2px 2px, rgba(0,0,0,0.01) 1px, transparent 0)
        `,
        backgroundSize: '20px 20px, 40px 40px'
      }}
    >
      {/* Main Content */}
      <div className="text-center space-y-8 max-w-sm w-full">
        
        {/* Game Title */}
        <div 
          className={`transition-all duration-700 ease-out ${
            animationStep >= 1 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 
            className="text-5xl sm:text-6xl font-bold text-black mb-2 font-space-grotesk"
            style={{
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}
          >
            Numbpair
          </h1>
        </div>

        {/* Subtitle */}
        <div 
          className={`transition-all duration-700 ease-out delay-200 ${
            animationStep >= 2 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          <p 
            className="text-gray-500 text-sm sm:text-base font-light px-2 whitespace-nowrap font-space-grotesk"
            style={{
              letterSpacing: '0.01em'
            }}
          >
            Match identical numbers or pairs that sum to 10
          </p>
        </div>

        {/* Start Game Button */}
        <div 
          className={`transition-all duration-700 ease-out delay-400 ${
            animationStep >= 3 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={onStartGame}
            className="group inline-flex items-center justify-center space-x-3 px-8 py-4 bg-black text-white rounded-full font-medium text-lg transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl touch-manipulation min-h-[56px] font-space-grotesk"
            style={{
              letterSpacing: '0.01em'
            }}
          >
            <Play 
              className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" 
              fill="currentColor"
            />
            <span>Start Game</span>
          </button>
        </div>
      </div>

      {/* Subtle background elements for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-[0.02] bg-black blur-3xl"
          style={{
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full opacity-[0.02] bg-black blur-3xl"
          style={{
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};