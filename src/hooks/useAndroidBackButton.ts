import { useEffect } from 'react';

interface UseAndroidBackButtonProps {
  isGameStarted: boolean;
  onBackToHome: () => void;
}

export const useAndroidBackButton = ({ isGameStarted, onBackToHome }: UseAndroidBackButtonProps) => {
  useEffect(() => {
    const handleBackButton = (event: KeyboardEvent) => {
      // Detect Android back button (Escape key)
      if (event.key === 'Escape') {
        if (isGameStarted) {
          // If on Game Page, show confirmation popup
          event.preventDefault();
          
          const shouldExit = window.confirm('Do you really want to exit the game?');
          
          if (shouldExit) {
            // User chose Yes - allow app to exit
            // We need to trigger the actual exit behavior
            if (window.history.length > 1) {
              window.history.back();
            } else {
              // If no history, try to close the window/app
              window.close();
            }
          }
          // If user chose No, do nothing (stay on Game Page)
        } else {
          // If on Home Page, allow app to exit (don't prevent default)
          // This will be handled by the browser/app container
          return;
        }
      }
    };

    // Add event listener for keydown events
    document.addEventListener('keydown', handleBackButton);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('keydown', handleBackButton);
    };
  }, [isGameStarted, onBackToHome]);
};