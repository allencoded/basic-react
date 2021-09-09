import { useEffect, useState } from "react";
import "./App.css";

const vespa = {
  itemId: 1,
  itemName: "2019 Vespa GTSS Super Sport 300",
  image: "https://i.ibb.co/m4jBFtc/2019vespa.jpg",
  price: 7149.0,
  currency: {
    display_name: "dollar",
    symbol: "$",
  },
};

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("playerOne");
  const [playerTallies, setPlayerTallies] = useState({
    playerOne: 0,
    playerTwo: 0,
  });
  const [bid, setBid] = useState("");
  const [winner, setWinner] = useState();

  useEffect(() => {
    if (playerTallies.playerOne && playerTallies.playerTwo) {
      checkWhoIsWinner();
    }
  },[playerTallies]);

  function togglePlayer() {
    if (currentPlayer === "playerOne") {
      setCurrentPlayer("playerTwo");
    } else {
      setCurrentPlayer("playerOne");
    }
  }

  function handleBidChange(value) {
    setBid(value);
  }

  function checkWhoIsWinner() {
    if (
      playerTallies.playerOne <= vespa.price &&
      playerTallies.playerOne > playerTallies.playerTwo
    ) {
      setWinner("Winner Is Player One");
    } else if (playerTallies.playerTwo <= vespa.price) {
      setWinner("Winner is Player Two");
    } else {
      setWinner("Everyone overbidded");
    }
  }

  function handleSubmit() {
    const price = parseInt(bid, 10);

    if (isNaN(price)) {
      return;
    } else if (playerTallies.playerOne === price) {
      console.log("Invalid same input as player one");
      return;
    }

    if (currentPlayer === "playerOne") {
      setPlayerTallies({ ...playerTallies, ...{ playerOne: price } });
    } else {
      setPlayerTallies({ ...playerTallies, ...{ playerTwo: price } });
    }

    togglePlayer();
    handleBidChange("");
  }

  return (
    <div>
      <label>Whos playing: {currentPlayer}</label>
      <div className="input-item-container">
        <div>
          <img className="item-image" src={vespa.image} alt={vespa.itemName} />
          <div>
            <div>Item name: {vespa.itemName}</div>
          </div>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => {
              handleBidChange(e.target.value);
            }}
            value={bid}
          />
          <button
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <label>{winner}</label>
    </div>
  );
}

export default App;
