import React from 'react';

import { BlockDropTargetAbove, BlockDropTargetBelow } from '../block-selection/BlockDropTarget';

/**
 * React Higher-Order Component that makes blocks selectable and
 * sets up drop sites for new block insertion.
 * @param {React.Component} Block - A block of some kind (i.e. Text, Image)
 * @returns 
 */
const makeBlock = (Block) => {
  // We should set a displayName and additional propTypes here.
  return (props) => (
    <div onClick={() => props.makeBlockActive(props.blockIndex)} className="block" style={{ position: 'relative' }}>
      <Block {...props} />
      <BlockDropTargetAbove index={props.blockIndex} insertBlock={props.insertBlock} />
      <BlockDropTargetBelow index={props.blockIndex + 1} insertBlock={props.insertBlock} />
    </div>
  );
};

export { makeBlock };