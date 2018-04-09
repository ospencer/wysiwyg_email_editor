import React from 'react';
import { DropTarget } from 'react-dnd';

import { DRAG_SOURCE_TYPE } from '../shared/Constants';

const dropTargetContract = {
  drop({ insertBlock, index }, monitor, component) {
    const { blockType } = monitor.getItem();
    insertBlock(blockType, index);
  }
};

const dropTargetConnection = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
});

const Target = ({ connectDropTarget, isOver, location }) => connectDropTarget(
  <div style={{ 
      borderBottom: isOver && location === 'below' ? '3px solid red' : 'none', 
      borderTop: isOver && location === 'above' ? '3px solid red' : 'none', 
      position: 'absolute', 
      width: '100%' ,
      height: '50%',
      top: location === 'below' ? '50%' : 0
    }} 
  />
);
const BlockDropTarget = DropTarget(DRAG_SOURCE_TYPE, dropTargetContract, dropTargetConnection)(Target);

const makeBlockDropTarget = (location) => {
  return (props) => (
    <BlockDropTarget location={location} {...props} />
  );
};

const BlockDropTargetAbove = makeBlockDropTarget('above');
const BlockDropTargetBelow = makeBlockDropTarget('below');

export { BlockDropTargetAbove, BlockDropTargetBelow };