import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getPokemon } from "../api/pokemonApi";
import type { Pokemon } from "../types/pokemon";
import styles from "./DetailPage.module.css";

// Set this to match how many Pokémon your app loads (used only when
// the page is opened directly, without the gallery's list)
const LAST_ID = 151;

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentId = Number(id);
  const ids = (location.state as { ids?: number[] } | null)?.ids;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    getPokemon(currentId)
      .then((data) => {
        if (!cancelled) setPokemon(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [currentId]);

  // Work out previous/next ids (null means "no button action")
  let prevId: number | null = null;
  let nextId: number | null = null;

  if (ids && ids.includes(currentId)) {
    const index = ids.indexOf(currentId);
    prevId = index > 0 ? ids[index - 1] : null;
    nextId = index < ids.length - 1 ? ids[index + 1] : null;
  } else {
    prevId = currentId > 1 ? currentId - 1 : null;
    nextId = currentId < LAST_ID ? currentId + 1 : null;
  }

  // Keep the filtered list in router state while moving between Pokémon
  const goTo = (target: number | null) => {
    if (target !== null) navigate(`/pokemon/${target}`, { state: { ids } });
  };

  return (
    <div className={styles.container}>
      <Link to="/gallery" className={styles.back}>
        ← Back to gallery
      </Link>

      <div className={styles.nav}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => goTo(prevId)}
          disabled={prevId === null}
        >
          ← Previous
        </button>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => goTo(nextId)}
          disabled={nextId === null}
        >
          Next →
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Couldn't load that Pokémon.</p>}

      {!loading && !error && pokemon && (
        <div className={styles.card}>
          <h1 className={styles.title}>
            #{pokemon.id} {pokemon.name}
          </h1>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className={styles.image}
          />

          <div className={styles.section}>
            <h2>Types</h2>
            <div className={styles.badges}>
              {pokemon.types.map((t) => (
                <span key={t.type.name} className={styles.badge}>
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2>Info</h2>
            <p>Height: {pokemon.height / 10} m</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
            <p>
              Abilities:{" "}
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </p>
          </div>

          <div className={styles.section}>
            <h2>Base Stats</h2>
            <ul className={styles.stats}>
              {pokemon.stats.map((s) => (
                <li key={s.stat.name}>
                  <span className={styles.statName}>{s.stat.name}</span>
                  <span>{s.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;