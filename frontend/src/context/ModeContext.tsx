import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Mode = 'learner' | 'developer';

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  // Check local storage first, default to 'learner'
  const [mode, setMode] = useState<Mode>(() => {
    return (localStorage.getItem('devpool_mode') as Mode) || 'learner';
  });

  // Save to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('devpool_mode', mode);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};