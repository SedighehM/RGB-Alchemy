import { useState, useEffect } from "react";
import GameInformation from "./components/GameInformation";
import getGameInfo from "./api";
import GameGrid from "./components/GameGrid";
import { calculateDelta } from "./utils";

function App() {
  const [gameInfo, setGameInfo] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    //Game information is only initialized when there is no information
    if (Object.entries(gameInfo).length === 0) {
      initGameInfo(userId);
    }
    //The game will be finished after a while(to be sure the view is updated)
    setTimeout(() => {
      finishGame();
    }, 300);
  }, [gameInfo]);

  //Initializes and sets Game Information according to user ID
  const initGameInfo = async (userId) => {
    //Fetches Basic Information
    const response = await getGameInfo(userId);
    //Sets Game Information - At first, black is the closest color
    setGameInfo({
      ...response.data,
      delta: calculateDelta([0, 0, 0], response.data?.target),
      closestColor: [0, 0, 0],
    });
    //ُSets user id for next hands
    setUserId(response.data.userId);
  };

  // Game Information will be set every time the user interaction is completed
  const updateGameInfo = (newDelta, newClosestColor) => {
    setGameInfo({
      ...gameInfo,
      delta: newDelta,
      closestColor: newClosestColor,
      maxMoves: --gameInfo.maxMoves,
    });
  };

  //Finishes the game
  const finishGame = () => {
    let playAgain = false;
    // When the user wins
    if (gameInfo.delta < 10) {
      playAgain = window.confirm("Success: Do you want to try again?");
    } // When the user fails
    else if (gameInfo.maxMoves === 0) {
      playAgain = window.confirm("Failed: Do you want to try again?");
    }
    // If the user wants to play again the Game will be initialized again
    if (playAgain) initGameInfo(userId);
  };

  return (
    <div>
      <GameInformation gameInfo={gameInfo} />
      <GameGrid
        target={gameInfo.target}
        updateGameInfo={updateGameInfo}
        width={gameInfo.width}
        height={gameInfo.height}
      />
    </div>
  );
}
export default App;
