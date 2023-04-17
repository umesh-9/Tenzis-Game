import { useState } from "react";
import "./App.css";
import Die from "./Components/Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }
  function rollDice() {
    setDice(allNewDice());
  }

  return (
    <main>
      <div className="dice-container">
        {dice.map((item, pos) => {
          return <Die key={item.id} value={item.value} isHeld={item.isHeld} />;
        })}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
