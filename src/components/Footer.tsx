import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="w-full bg-black/20 border-t border-white/10 py-3 px-4 flex-shrink-0 backdrop-blur-sm">
      <div className="max-w-xs sm:max-w-sm mx-auto">
        <p className="text-xs text-center text-white/60 leading-relaxed">
          © 2025 Numbpair • Made with ❤️ by Aswin MV
        </p>
      </div>
    </div>
  );
};