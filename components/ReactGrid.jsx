'use client'

import ReactGridLayout from "react-grid-layout"
import { useState } from "react";



const ReactGrid = () => {
    const layout = [
        { i: "a", x: 0, y: 0, w: 3, h: 4 },
        { i: "b", x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: "c", x: 6, y: 0, w: 3, h: 5 }
      ];
    
    const [isDragging, setDragging] = useState(null);

    const onDragStart = (layout, oldItem, newItem, placeholder, e, element) => {
        setDragging(newItem.i);
    }
    const onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
        setDragging(null);
    }

    return (
      <div className="grid-container w-full min-h-[500px]">
      <ReactGridLayout
        className="layout border border-black w-full h-full"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        isDraggable={true}
        isResizable={false}
        useCSSTransforms={true}
        onDragStart={onDragStart}
        onDragStop={onDragStop}
      >
        <div key="a" className={`bg-black text-white ${isDragging === 'a' ? 'dragging' : ''}`}>a</div>
        <div key="b" className={`bg-black text-white ${isDragging === 'b' ? 'dragging' : ''}`}>b</div>
        <div key="c" className={`bg-black text-white ${isDragging === 'c' ? 'dragging' : ''}`}>c</div>
      </ReactGridLayout>
      </div>
    );
}

export default ReactGrid