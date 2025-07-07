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
        event.preventDefault();
        
        if (isGameStarted) {
          // If on Game Page, go back to Home Page
          onBackToHome();
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