// types.ts
export interface CandlestickData {
    labels: string[];
    datasets: {
      label: string;
      data: {
        t: number; // Timestamp
        o: number; // Prix d'ouverture
        h: number; // Prix le plus haut
        l: number; // Prix le plus bas
        c: number; // Prix de clôture
      }[];
    }[];
  }
  
  // types.ts
export interface ICandlestickData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: Array<{
      x: string; // Temps ou catégorie
      o: number; // Open
      h: number; // High
      l: number; // Low
      c: number; // Close
    }>;
  }>;
}
