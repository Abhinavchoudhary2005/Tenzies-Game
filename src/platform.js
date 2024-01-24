import React from "react";
import Box from "./box.js";

export default function Platform() {
  const [randomarray, setrandomarray] = React.useState(newdice());

  function newdice() {
    const array = [];
    for (let i = 0; i < 12; i++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      array.push({ id: i, value: randomNumber, isheld: false });
    }

    return array;
  }

  function rolldice() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    return randomNumber;
  }

  function buttonhandleclick() {
    setrandomarray((prevdata) => {
      return prevdata.map((die) => ({
        ...die,
        value: die.isheld ? die.value : rolldice(),
      }));
    });
  }

  function boxhandleclick(dieId) {
    setrandomarray((prevdata) => {
      return prevdata.map((die) =>
        die.id === dieId ? { ...die, isheld: !die.isheld } : die
      );
    });
  }

  return (
    <div>
      <div className="card">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice all are the same. click the dice to freeze it at
          its current value between rolls
        </p>
        <div className="box-container">
          {randomarray.map((die) => (
            <Box
              key={die.id}
              getRndInteger={die.value}
              handleclick={() => boxhandleclick(die.id)}
              isheld={die.isheld}
            />
          ))}
        </div>
        <button
          type="button"
          className="btn"
          style={{ backgroundColor: "blueviolet", color: "white" }}
          onClick={buttonhandleclick}
        >
          Roll Dice
        </button>
      </div>
    </div>
  );
}
