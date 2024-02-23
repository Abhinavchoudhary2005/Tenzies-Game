import React from "react";
import Box from "./box.jsx";

export default function Platform() {
  const [randomarray, setrandomarray] = React.useState(newdice());
  const [timesroll, setTimesroll] = React.useState(0);
  const [win, setWin] = React.useState(false);

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
    setTimesroll(timesroll + 1);
  }

  function boxhandleclick(dieId) {
    setrandomarray((prevdata) => {
      return prevdata.map((die) =>
        die.id === dieId ? { ...die, isheld: !die.isheld } : die
      );
    });

    let isWin = true;
    for (let i = 0; i < randomarray.length - 1; i++) {
      if (randomarray[i].value !== randomarray[i + 1].value) {
        isWin = false;
        break;
      }
    }
    setWin(isWin);
  }

  function Restart() {
    window.location.reload();
  }

  return (
    <div>
      <div className="card">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click the dice to freeze it at its
          current value between rolls.
        </p>
        <h3>Die Roll Count: {timesroll}</h3>
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
        <br />
        {win && (
          <div>
            <h2>It Took You {timesroll} Die Rolls to Win</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="btn"
                onClick={Restart}
                style={{
                  backgroundColor: "blueviolet",
                  color: "white",
                  width: "120px",
                }}
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
