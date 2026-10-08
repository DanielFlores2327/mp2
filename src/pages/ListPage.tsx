import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPokemon } from "../api/pokemonApi";
import type { Pokemon } from "../types/pokemon";
import styles from "./ListPage.module.css";

function ListPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getAllPokemon().then((data) => {
      setPokemon(data);
    });
  }, []);

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.includes(search.trim().toLowerCase())
  );

  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (sortBy === "id") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    }

    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (sortBy === "special-attack") {
      const aSpAtk =
        a.stats.find((stat) => stat.stat.name === "special-attack")
          ?.base_stat ?? 0;

      const bSpAtk =
        b.stats.find((stat) => stat.stat.name === "special-attack")
          ?.base_stat ?? 0;

      return sortOrder === "asc" ? aSpAtk - bSpAtk : bSpAtk - aSpAtk;
    }

    return 0;
  });

  return (
    <div>
      <h1>KantoDex</h1>
      <div className={styles.controls}>
  <input
    type="text"
    className={styles.search}
    placeholder="Search by name..."
    value={search}
    onChange={(event) => setSearch(event.target.value)}
  />

  <div className={styles.group} role="group" aria-label="Sort by">
    <button
      type="button"
      className={sortBy === "id" ? `${styles.segment} ${styles.selected}` : styles.segment}
      onClick={() => setSortBy("id")}
    >
      ID
    </button>
    <button
      type="button"
      className={sortBy === "name" ? `${styles.segment} ${styles.selected}` : styles.segment}
      onClick={() => setSortBy("name")}
    >
      Name
    </button>
  </div>

  <div className={styles.group} role="group" aria-label="Sort order">
    <button
      type="button"
      className={sortOrder === "asc" ? `${styles.segment} ${styles.selected}` : styles.segment}
      onClick={() => setSortOrder("asc")}
    >
      Ascending
    </button>
    <button
      type="button"
      className={sortOrder === "desc" ? `${styles.segment} ${styles.selected}` : styles.segment}
      onClick={() => setSortOrder("desc")}
    >
      Descending
    </button>
  </div>
</div>

      <ul className={styles.list}>
        {sortedPokemon.map((poke) => (
          <li key={poke.id}>
            <Link
              to={`/pokemon/${poke.id}`}
              state={{ ids: sortedPokemon.map((p) => p.id) }}
              className={styles.row}
            >
              #{poke.id} - {poke.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;