import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Components/Die";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const fristValue = dice[0].value;
    if (allHeld && dice.every((die) => die.value === fristValue)) {
      setTenzies(true);
      console.log("won the game");
    }
  }, [dice]);
  function generateDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice());
    }
    return newDice;
  }
  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }
  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {dice.map((item, pos) => {
          return (
            <Die
              key={item.id}
              value={item.value}
              isHeld={item.isHeld}
              holdDice={() => holdDice(item.id)}
            />
          );
        })}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
