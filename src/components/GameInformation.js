import Tile from "./Tile";

function GameInformation({ gameInfo }) {
  return (
    <div className="information-line">
      <h1>RGB Alchemy</h1>
      <div className="text-element">User ID: {gameInfo.userId}</div>
      <div className="text-element">Moves left: {gameInfo.maxMoves}</div>
      <div className="information-element">
        Target color
        <span className="tile-info">
          <Tile tileInfo={{ color: gameInfo.target, isDraggable: false }} />
        </span>
      </div>
      <div className="information-element">
        <div className="closest-color">
          Closest color
          <span className="tile-info">
            <Tile
              tileInfo={{
                color: gameInfo.closestColor,
                isDraggable: false,
              }}
            />
          </span>
        </div>
        <div className="delta">&#916;={gameInfo.delta}%</div>
      </div>
    </div>
  );
}
export default GameInformation;
