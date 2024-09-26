export interface UserFiltersProps {
    region: string;
    setRegion: (region: string) => void;
    errorCount: number;
    setErrorCount: (count: number) => void;
    seed: number;
    setSeed: (seed: number) => void;
    handleSeedRandom: () => void;
  }