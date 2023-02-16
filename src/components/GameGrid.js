import Source from "./source";
import Tile from "./Tile";
import { useState, useEffect } from "react";
import { calculateDelta, generateGrid } from "../utils";
import { rgbColors } from "../enums";

function GameGrid({ width, height, target, updateGameInfo }) {
  const [grid, setGrid] = useState(null);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    //Initializes grid with new height and width
    if (height && width) {
      setGrid(generateGrid(height, width));
      setMoves(0);
    }
  }, [width, height]);

  //Updates dynamic information of the game
  const updateInfo = () => {
    let minDelta = 100;
    const newGrid = [...grid];
    let closestPosition = [1, 1];
    //Scans the Whole Grid
    for (let i = 0; i <= height + 1; i++) {
      for (let j = 0; j <= width + 1; j++) {
        //Makes all the sources unClickable after 3 moves
        if (moves === 2 && grid[i][j]?.type === "source") {
          newGrid[i][j] = {
            ...newGrid[i][j],
            isClickable: false,
          };
        }
        //Finds the minimum delta and closest color among tiles
        if (grid[i][j]?.type === "tile") {
          let currentDelta = calculateDelta(grid[i][j].color, target);
          newGrid[i][j] = {
            ...newGrid[i][j],
            isClosest: false,
            isDraggable: moves >= 2 ? true : false,
          };
          if (currentDelta < minDelta) {
            minDelta = currentDelta;
            closestPosition = [i, j];
          }
        }
      }
    }
    newGrid[closestPosition[0]][closestPosition[1]] = {
      ...newGrid[closestPosition[0]][closestPosition[1]],
      isClosest: true,
    };
    updateGameInfo(
      minDelta,
      newGrid[closestPosition[0]][closestPosition[1]].color
    );
  };

  //Generates color for a tile according to its position in the grid
  const generateColor = (rowIndex, columnIndex) => {
    let finalColor = [0, 0, 0];
    //Sums the effective color of surrounding sources
    for (let i = 0; i < 3; i++) {
      finalColor[i] =
        grid[0][columnIndex].color[i] * (1 - rowIndex / (height + 1)) +
        grid[height + 1][columnIndex].color[i] * (rowIndex / (height + 1)) +
        grid[rowIndex][0].color[i] * (1 - columnIndex / (width + 1)) +
        grid[rowIndex][width + 1].color[i] * (columnIndex / (width + 1));
    }
    let normalizationFactor = 255 / Math.max(...finalColor, 255);
    //Multiplies normalization factor to the calculated color
    return finalColor.map((el) => {
      return Math.round(el * normalizationFactor);
    });
  };

  //Handles updating of source
  const handleSourceUpdate = (rowIndex, columnIndex, color) => {
    const newGrid = [...grid];
    setMoves(moves + 1);
    //Updates color of Clicked source
    newGrid[rowIndex][columnIndex] = {
      ...newGrid[rowIndex][columnIndex],
      color: color ? color : rgbColors[moves],
    };
    //When the clicked source is on the top or bottom of the grid
    if (rowIndex === 0 || rowIndex === height + 1) {
      //Updates Color of tiles vertically using calculated color
      for (let i = rowIndex - 1; Math.abs(i - rowIndex) < height + 1; i--) {
        let calculatedColor = generateColor(Math.abs(i), columnIndex);
        newGrid[Math.abs(i)][columnIndex] = {
          ...newGrid[Math.abs(i)][columnIndex],
          color: calculatedColor,
        };
      }
    }
    //When the clicked source is on the right or left of the grid
    else {
      //Updates Color of tiles horizontally using calculated color
      for (
        let i = columnIndex - 1;
        Math.abs(i - columnIndex) < width + 1;
        i--
      ) {
        let calculatedColor = generateColor(rowIndex, Math.abs(i));
        newGrid[rowIndex][Math.abs(i)] = {
          ...newGrid[rowIndex][Math.abs(i)],
          color: calculatedColor,
        };
      }
    }
    updateInfo();
  };

  //Creates a table of sources and tiles based on the grid
  var renderedTable = grid?.map(function (columns, i) {
    var entry = columns.map(function (element, j) {
      if (element?.type === "source") {
        return (
          <td key={j}>
            <Source
              handleSourceUpdate={handleSourceUpdate}
              sourceInfo={grid[i][j]}
            />
          </td>
        );
      } else if (element === null) {
        return (
          <td key={j}>
            <div></div>
          </td>
        );
      } else {
        return (
          <td key={j}>
            <Tile tileInfo={grid[i][j]} />
          </td>
        );
      }
    });
    return <tr key={i}>{entry}</tr>;
  });

  return (
    <div>
      <table>
        <tbody>{renderedTable}</tbody>
      </table>
    </div>
  );
}
export default GameGrid;
