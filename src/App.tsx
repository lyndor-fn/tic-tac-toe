import React from 'react';
import Checkerboard from './components/Checkerboard.tsx';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center font-sans">
      <Toaster richColors />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Jeu de Dames Africain</h1>
      <Checkerboard />
    </div>
  );
};

export default App;