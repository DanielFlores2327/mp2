import axios from "axios";
import type { Pokemon } from "../types/pokemon";
export async function getPokemon(id: number): Promise<Pokemon> {
    const response = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
  
    return response.data;
}
export async function getAllPokemon(): Promise<Pokemon[]> {
    const requests = [];
  
    for (let id = 1; id <= 151; id++) {
      requests.push(getPokemon(id));
    }
  
    return Promise.all(requests);
}