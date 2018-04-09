import React from 'react';
import { DragSource } from 'react-dnd';

import { 
  BLOCKS, DRAG_SOURCE_TYPE
} from '../../shared/Constants';

const dragSourceContract = {
  beginDrag({ blockType }) {
    return { blockType };
  }
};

const dragSourceConnection = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const BaseBlock = ({ icon, description, connectDragSource }) => connectDragSource(
  <div style={{ border: '2px dashed darkgray', width: '3em', padding: '0 2em' }}>
    <h1>{icon}</h1>
    <h3>{description}</h3>
  </div>
);
const DraggableBaseBlock = DragSource(DRAG_SOURCE_TYPE, dragSourceContract, dragSourceConnection)(BaseBlock);

const BlockSelectionPane = () => {
  const blocks = BLOCKS.map(({ icon, type }) => (
    <DraggableBaseBlock key={type} blockType={type} icon={icon} description={type} />
  ));
  return (
    <div style={{ display: 'flex' }}>
      {blocks}
    </div>
  );
};

export default BlockSelectionPane;