import { useState, useEffect } from "react";

function Source({ sourceInfo, handleSourceUpdate }) {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    //Every time sourceInfo prop is changed the background will be set
    setBackground("rgb(" + sourceInfo.color?.join(", ") + ")");
  }, [sourceInfo]);

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (e) => {
    // If the source is not clickable it means drop is allowed
    if (!sourceInfo.isClickable) {
      // Calls the handleSourceUpdate in GameGrid component with the index of source and color
      handleSourceUpdate(
        sourceInfo.i,
        sourceInfo.j,
        Array.from(e.dataTransfer.getData("color").split(","), Number)
      );
    }
  };

  return (
    <div
      className="source"
      style={{
        backgroundColor: background,
        cursor: sourceInfo.isClickable ? "pointer" : null,
      }}
      title={sourceInfo.color}
      onDragOver={(ev) => onDragOver(ev)}
      onDrop={(e) => onDrop(e)}
      onClick={() => {
        if (sourceInfo.isClickable) {
          handleSourceUpdate(sourceInfo.i, sourceInfo.j);
        }
      }}
    ></div>
  );
}
export default Source;
