import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPokemon } from "../api/pokemonApi";
import type { Pokemon } from "../types/pokemon";
import styles from "./GalleryPage.module.css";

function GalleryPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    getAllPokemon().then((data) => {
      setPokemon(data);
    });
  }, []);

  // Unique type names across all loaded Pokémon, alphabetized
  const allTypes = useMemo(
    () =>
      Array.from(
        new Set(pokemon.flatMap((p) => p.types.map((t) => t.type.name)))
      ).sort(),
    [pokemon]
  );

  // Add the type if it's not selected, remove it if it is
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Show everything when nothing is selected; otherwise match ANY selected type
  const filteredPokemon = useMemo(() => {
    if (selectedTypes.length === 0) return pokemon;
    return pokemon.filter((p) =>
      p.types.some((t) => selectedTypes.includes(t.type.name))
    );
  }, [pokemon, selectedTypes]);

  return (
    <div className={styles.container}>
      <h1>KantoDex Gallery</h1>

      <div className={styles.filters}>
        {allTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={
              selectedTypes.includes(type)
                ? `${styles.filterButton} ${styles.active}`
                : styles.filterButton
            }
            onClick={() => toggleType(type)}
          >
            {type}
          </button>
        ))}
        {selectedTypes.length > 0 && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => setSelectedTypes([])}
          >
            Clear
          </button>
        )}
      </div>

      <p className={styles.count}>
        Showing {filteredPokemon.length} of {pokemon.length}
      </p>

      <div className={styles.grid}>
        {filteredPokemon.map((poke) => (
          <Link
            key={poke.id}
            to={`/pokemon/${poke.id}`}
            state={{ ids: filteredPokemon.map((p) => p.id) }}
            className={styles.card}
          >
            <img
              src={poke.sprites.front_default}
              alt={poke.name}
              className={styles.image}
              loading="lazy"
            />
            <p className={styles.name}>
              #{poke.id} - {poke.name}
            </p>
          </Link>
        ))}
      </div>

      {pokemon.length > 0 && filteredPokemon.length === 0 && (
        <p>No Pokémon match those types.</p>
      )}
    </div>
  );
}

export default GalleryPage;