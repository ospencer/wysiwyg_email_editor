import React from 'react';

import TextBlock from '../block/TextBlock';
import { BLOCK_TYPES } from '../../shared/Constants';

export default class LivePreview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderBlocks = this.renderBlocks.bind(this);
  }
  
  renderBlocks() {
    return this.props.blocks.map((block, blockIndex) => {
      const sharedProps = {
        blockIndex: blockIndex,
        makeBlockActive: this.props.makeBlockActive,
        active: blockIndex === this.props.activeBlockIndex,
        insertBlock: this.props.insertBlock
      };
      switch (block.type) {
        case BLOCK_TYPES.TEXT:
          return (
            <TextBlock
              {...sharedProps}
              key={`TextBlock${blockIndex}`}
              editorState={block.editorState}
            />
          );
        default:
          throw new Error(`Block type "${block.type}" not supported.`);
      }
    });
  }
  
  render() {
    return (
      <div className="block-list" style={{ width: '600px', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
        {this.renderBlocks()}
      </div>
    );
  }
}