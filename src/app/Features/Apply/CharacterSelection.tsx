"use client";

import { useState, useEffect } from "react";

type Character = {
  id: string;
  name: string;
  level: number;
  realm: string;
};

const CharacterSelection = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [main, setMain] = useState<string | null>(null);
  const [alts, setAlts] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data) => setCharacters(data.characters));
  }, []);

  const handleSelection = () => {
    console.log("Main:", main);
    console.log("Alts:", alts);
    // Submit data to the backend
  };

  return (
    <div>
      <h2>Select Main Character</h2>
      <select onChange={(e) => setMain(e.target.value)}>
        <option value="">-- Select Main --</option>
        {characters.map((char) => (
          <option key={char.id} value={char.name}>
            {char.name} - Level {char.level} ({char.realm})
          </option>
        ))}
      </select>

      <h2>Select Raid Ready Alts</h2>
      <ul>
        {characters.map((char) => (
          <li key={char.id}>
            <label>
              <input
                type="checkbox"
                value={char.name}
                onChange={(e) => {
                  const altName = e.target.value;
                  setAlts((prevAlts) =>
                    e.target.checked
                      ? [...prevAlts, altName]
                      : prevAlts.filter((alt) => alt !== altName)
                  );
                }}
              />
              {char.name} - Level {char.level} ({char.realm})
            </label>
          </li>
        ))}
      </ul>

      <button onClick={handleSelection}>Apply</button>
    </div>
  );
};

export default CharacterSelection;
