import React, { useRef, useEffect, useState } from "react";

const SimpleCanvasEditor = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [texts, setTexts] = useState([]);
  const [draggingTextIndex, setDraggingTextIndex] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      setCtx(context);
    }
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setLastPosition(getMousePos(e));
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const mousePos = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    setLastPosition(mousePos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const addText = () => {
    const text = prompt("Enter text:", "Hello, Canvas!");
    if (text) {
      const newText = {
        content: text,
        x: 50,
        y: 50,
        isDragging: false,
      };
      setTexts((prevTexts) => [...prevTexts, newText]);
    }
  };

  const clearCanvas = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleMouseDown = (e) => {
    const mousePos = getMousePos(e);
    const textIndex = texts.findIndex(
      (text) =>
        mousePos.x >= text.x &&
        mousePos.x <= text.x + ctx.measureText(text.content).width &&
        mousePos.y <= text.y &&
        mousePos.y >= text.y - 20
    );

    if (textIndex !== -1) {
      setDraggingTextIndex(textIndex);
      setIsDrawing(false); // Disable drawing when dragging text
    } else {
      startDrawing(e);
    }
  };

  const handleMouseMove = (e) => {
    if (draggingTextIndex !== null) {
      const mousePos = getMousePos(e);
      const updatedTexts = [...texts];
      updatedTexts[draggingTextIndex] = {
        ...updatedTexts[draggingTextIndex],
        x: mousePos.x,
        y: mousePos.y,
      };
      setTexts(updatedTexts);
      drawAll();
    } else {
      draw(e);
    }
  };

  const handleMouseUp = () => {
    setDraggingTextIndex(null);
    setIsDrawing(false);
  };

  const drawAll = () => {
    if (ctx) {
      clearCanvas();
      texts.forEach((text) => {
        ctx.font = "20px Arial";
        ctx.fillText(text.content, text.x, text.y);
      });
    }
  };

  useEffect(() => {
    drawAll();
  }, [texts]);

  return (
    <div className="flex flex-col items-center p-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300 mb-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      />
      <div className="flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addText}
        >
          Add Text
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={clearCanvas}
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default SimpleCanvasEditor;
