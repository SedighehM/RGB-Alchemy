//Calculates the difference of target color and obtained color
const calculateDelta = (color, target) => {
  let meanSquaredError = Math.sqrt(
    Math.pow(color[0] - target[0], 2) +
      Math.pow(color[1] - target[1], 2) +
      Math.pow(color[2] - target[2], 2)
  );
  return ((1 / 255) * (1 / Math.sqrt(3)) * meanSquaredError * 100).toFixed(2);
};

//Generates a grid of game according to the number of rows and columns
const generateGrid = (rows, columns) => {
  return Array(rows + 2)
    .fill()
    .map((el, i) =>
      Array(columns + 2)
        .fill()
        .map((el, j) => {
          // Puts nothing on the corners
          if (
            (i === 0 && j === 0) ||
            (i === 0 && j === columns + 1) ||
            (i === rows + 1 && j === 0) ||
            (i === rows + 1 && j === columns + 1)
          ) {
            return null;
          } // Puts sources(circles) surrounding - All the sources are clickable at first
          else if (j === 0 || i === 0 || i === rows + 1 || j === columns + 1) {
            return {
              type: "source",
              isClickable: true,
              color: [0, 0, 0],
              i: i,
              j: j,
            };
          } //The first tile has initially the closest color
          else if (i === 1 && j === 1) {
            return {
              type: "tile",
              isDraggable: false,
              color: [0, 0, 0],
              i: i,
              j: j,
              isClosest: true,
            };
          } // Puts Tiles(squares) in the middle - None of the tiles are initially draggable
          else {
            return {
              type: "tile",
              isDraggable: false,
              color: [0, 0, 0],
              i: i,
              j: j,
            };
          }
        })
    );
};
export { calculateDelta, generateGrid };
