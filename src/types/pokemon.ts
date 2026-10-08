export interface Pokemon {
    id: number;
    name: string;
    types: {
      type: {
        name: string;
      };
    }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
    sprites: {
      front_default: string;
    };
    height: number;   // decimetres
    weight: number;   // hectograms
    abilities: { ability: { name: string } }[];
  }