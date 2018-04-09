import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import RichTextEditor from './rich-text-editor/RichTextEditor';
import TitleBar from './block-selection/TitleBar';
import BlockSelectionPane from './block-selection/BlockSelectionPane';
import LivePreview from './email-live-preview/LivePreview';
import { DEFAULT_BLOCKS } from '../shared/Constants';

import 'draft-js/dist/Draft.css';

class TemplateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.insertBlock = this.insertBlock.bind(this);
    this.makeBlockActive = this.makeBlockActive.bind(this);
    this.resetActiveBlock = this.resetActiveBlock.bind(this);
    this.blurBlockSelection = this.blurBlockSelection.bind(this);
    this.updateBlockEditorState = this.updateBlockEditorState.bind(this);

    this.state = {
      activeBlockIndex: null
    };
  }

  /**
   * Add a new block to the email template.
   * @param {string} blockType 
   * @param {number} blockIndex 
   * @memberof App
   */
  insertBlock(blockType, blockIndex) {
    // Don't mutate this.state in place.
    const blocks = [...this.props.template.blocks];
    if (DEFAULT_BLOCKS[blockType]) {
      let newBlock = {...DEFAULT_BLOCKS[blockType]};
      blocks.splice(blockIndex, 0, newBlock);
      this.props.updateTemplate({ blocks });
    }
  }

  /**
   * Makes the block at index blockIndex active for editing.
   * @param {number} blockIndex 
   * @memberof App
   */
  makeBlockActive(blockIndex) {
    // If for some reason the active block attempts to call this method,
    // we don't want to set the initial state to the current state.
    if (blockIndex !== this.state.activeBlockIndex) {
      this.setState({
        activeBlockIndex: blockIndex,
        activeBlockInitialState: { ...this.props.template.blocks[blockIndex] }
      });
    }
  }

  resetActiveBlock() {
    // Not mutating this.state.
    const blocks = [...this.props.template.blocks];
    blocks[this.state.activeBlockIndex] = this.state.activeBlockInitialState;
    this.props.updateTemplate({ blocks });
  }

  blurBlockSelection() {
    this.setState({ activeBlockIndex: null });
  }

  /**
   * Updates the editorState of the active block. Will cause the block to rerender with the updated changes.
   * @param {EditorState} editorState - The (immutable) editorState to replace the current one with.
   * @memberof App
   */
  updateBlockEditorState(editorState) {
    // Let's not mutate this.state in place.
    // It may be worth pulling in Immutable.js to prevent accidental mutations.
    const blocks = [...this.props.template.blocks];

    // Make a brand new block object, with the new editorState.
    const newBlock = { ...blocks[this.state.activeBlockIndex], editorState };
    blocks[this.state.activeBlockIndex] = newBlock;
    this.props.updateTemplate({ blocks });
  }

  render() {
    let blockSectionPanelContent, activeBlockType;
    if (this.state.activeBlockIndex != null) {
      blockSectionPanelContent = (
        <RichTextEditor
          editorState={this.props.template.blocks[this.state.activeBlockIndex].editorState}
          updateBlockEditorState={this.updateBlockEditorState}
        />
      );
      activeBlockType = this.props.template.blocks[this.state.activeBlockIndex].type;
    } else {
      blockSectionPanelContent = (
        <BlockSelectionPane />
      );
      activeBlockType = null;
    }
    return (
      <div className="template-editor" style={{display: 'flex', width: '100%'}}>
        <div className="block-selection-pane" style={{width: '350px'}}>
          <TitleBar
            activeBlockType={activeBlockType}
            resetActiveBlock={this.resetActiveBlock}
            blurBlockSelection={this.blurBlockSelection}
          />
          {blockSectionPanelContent}
        </div>
        <center style={{flexGrow: 1, backgroundColor: 'lightgray', paddingBottom: '28px'}}>
          <h2>
            Template Preview
          </h2>
          <LivePreview
            blocks={this.props.template.blocks}
            activeBlockIndex={this.state.activeBlockIndex}
            makeBlockActive={this.makeBlockActive}
            insertBlock={this.insertBlock}
          />
        </center>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(TemplateEditor);
