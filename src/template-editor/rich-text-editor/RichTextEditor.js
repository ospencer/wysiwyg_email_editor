import React from 'react';
import { Editor, RichUtils } from 'draft-js';

import Controls from './Controls';

export default class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  onChange(editorState) {
    this.props.updateBlockEditorState(editorState);
  }
  
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    );
  }
  
  render() {
    return (
      <div>
        <Controls 
          editorState={this.props.editorState}
          toggleBlockType={this.toggleBlockType} 
          toggleInlineStyle={this.toggleInlineStyle}
        />
        <Editor
          editorState={this.props.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
        />
      </div>
    )
  }
}