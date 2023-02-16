import { useState, useEffect } from "react";

function Tile({ tileInfo }) {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    //Every time tileInfo prop is changed the background will be set
    setBackground("rgb(" + tileInfo.color?.join(", ") + ")");
  }, [tileInfo]);

  //The color of the tile will be transferred when Drag is started(We use this color when the drop is completed)
  const onDragStart = (ev) => {
    ev.dataTransfer.setData("color", tileInfo.color);
  };

  return (
    <div
      className="tile"
      style={{
        backgroundColor: background,
        cursor: tileInfo.isDraggable ? "pointer" : null,
        border: tileInfo.isClosest ? "2px solid red" : "2px solid gray",
      }}
      title={tileInfo.color}
      draggable={tileInfo.isDraggable ? true : false}
      onDragStart={(e) => {
        if (tileInfo.isDraggable) onDragStart(e);
      }}
    ></div>
  );
}
export default Tile;
