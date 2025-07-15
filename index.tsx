
import { useState } from "react";

const initialPlayers = [
  "Abdi", "Adam", "Adrian", "Amar", "Amine", "Belyami", "Bilal", "Davin",
  "Dimitar", "Ernes", "Irfan", "Ishaq", "Jaron", "Joel", "Lukas", "Mahir",
  "Manu", "Mehmet", "Mohamed Amin", "Reza", "Nart", "Semih", "Yassin",
  "Yazan", "Younes", "Youssef"
];

export default function Spielerliste12er() {
  const [players, setPlayers] = useState(initialPlayers);
  const [selected, setSelected] = useState(
    Object.fromEntries(initialPlayers.map((name) => [name, true]))
  );
  const [numToPick, setNumToPick] = useState(2);
  const [lastWinners, setLastWinners] = useState([]);
  const [currentWinners, setCurrentWinners] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const togglePlayer = (name) => {
    setSelected((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleDraw = () => {
    const eligible = players.filter((name) => selected[name]);
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const winners = shuffled.slice(0, numToPick);
    setCurrentWinners(winners);
    setLastWinners((prev) => [winners, ...prev.slice(0, 2)]);
  };

  const addPlayer = () => {
    const name = newPlayerName.trim();
    if (name && !players.includes(name)) {
      setPlayers((prev) => [...prev, name]);
      setSelected((prev) => ({ ...prev, [name]: true }));
      setNewPlayerName("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center space-y-4">
      <h1 className="text-2xl font-bold text-blue-800">Spielerliste 12er</h1>

      <div className="grid grid-cols-2 gap-2">
        {players.map((name) => (
          <label
            key={name}
            className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow border"
          >
            <input
              type="checkbox"
              checked={selected[name]}
              onChange={() => togglePlayer(name)}
            />
            <span>{name}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-2">
        <label className="text-blue-700">Anzahl Spieler:</label>
        <input
          type="number"
          className="w-16 p-1 border rounded text-center"
          min={1}
          max={players.length}
          value={numToPick}
          onChange={(e) => setNumToPick(Number(e.target.value))}
        />
      </div>

      <button onClick={handleDraw} className="bg-blue-600 text-white px-4 py-2 rounded">
        Zufällige Spieler auswählen
      </button>

      {currentWinners.length > 0 && (
        <div className="bg-blue-100 p-4 rounded text-lg text-blue-900">
          🎉 Gewählt: {currentWinners.join(" & ")}
        </div>
      )}

      {lastWinners.length > 0 && (
        <div className="text-sm text-blue-700">
          <h2 className="font-semibold">Letzte Gewinner:</h2>
          <ul>
            {lastWinners.map((entry, i) => (
              <li key={i}>👉 {entry.join(" & ")}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center space-x-2 pt-4">
        <input
          type="text"
          placeholder="Neuer Spieler"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button onClick={addPlayer} className="bg-blue-500 text-white px-3 py-1 rounded">
          Hinzufügen
        </button>
      </div>
    </div>
  );
}
