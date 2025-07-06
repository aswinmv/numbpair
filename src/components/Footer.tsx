import React from 'react';

interface FooterProps {
  gameStarted: boolean;
}

export const Footer: React.FC<FooterProps> = ({ gameStarted }) => {
  // Only show footer when game is started
  if (!gameStarted) {
    return null;
  }

  return (
    <div className="w-full bg-white border-t border-gray-100 py-2 px-4 flex-shrink-0">
      <div className="max-w-xs sm:max-w-sm mx-auto">
        <p className="text-xs text-center text-gray-500 leading-relaxed">
          © 2025 Numbpair • Made with ❤️ by Aswin MV
        </p>
      </div>
    </div>
  );
};