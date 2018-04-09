import React from 'react';

import { makeBlock } from './Block';

const SUBBLOCK_MAP = {
  'paragraph': 'p',
  'header-one': 'h1',
  'header-two': 'h2',
  'header-three': 'h3',
  'header-four': 'h4',
  'header-five': 'h5',
  'header-six': 'h6',
  'blockquote': 'blockquote',
  'unordered-list-item': 'li',
  'ordered-list-item': 'li',
  'code-block': 'code',
}

const STYLE_MAP = {
  'BOLD': { 'fontWeight': 'bold' },
  'ITALIC': { 'fontStyle': 'italic' },
  'UNDERLINE': { 'textDecoration': 'underline' },
}

/**
 * The block for template text. 
 * This class handles how the text is rendered in the live preview.
 * @class TextBlock
 * @extends {React.Component}
 */
class TextBlock extends React.Component {
  constructor(props) {
    super(props);
    this.renderBlockContent = this.renderBlockContent.bind(this);
  }

  /**
   * @callback mapStyleRangesCallback
   * @param {string} text - The text in the range
   * @param {Object} styles - A React-compatible style object with styles for the range
   * @param {number} start - The index of the character that starts the range in the full text
   * @param {number} end - The index of the character that ends the range in the full text
   * @returns {any}
   */
  /**
   * Utility function that maps contiguous ranges of text with the same
   * styles.
   * @param {Draft.ContentBlock} subBlock - "sub-block" (i.e. paragraph, h1) containing text
   * @param {mapStyleRangesCallback} fn - Function mapped over each style range
   * @returns {Array} - An array of the output of the callback
   * @memberof TextBlock
   */
  mapStyleRanges(subBlock, fn) {
    const result = [];
    const plainText = subBlock.getText();
    const filterFn = () => true;
    // This is basically a for-each of style ranges.
    subBlock.findStyleRanges(filterFn, (start, end) => {
      const text = plainText.slice(start, end);
      const rawStyles = subBlock.getInlineStyleAt(start);
      // Create a React style object from the raw styles.
      const styles = rawStyles.reduce((styles, rawStyle) => ({ ...styles, ...STYLE_MAP[rawStyle] }), {});
      const fnResult = fn(text, styles, start, end);
      result.push(fnResult);
    });
    return result;
  }

  /**
   * Renders the contents of the block, by sub-blocks.
   * @returns {Array} - React nodes
   * @memberof TextBlock
   */
  renderBlockContent() {
    // Get a list of "sub-blocks", i.e. spans of text of a certain tag.
    const subBlockList = this.props.editorState.getCurrentContent().getBlockMap();

    return subBlockList.map((subBlock) => {
      const SubBlockTag = SUBBLOCK_MAP[subBlock.getType()];
      let content = this.mapStyleRanges(subBlock, (text, styles, start) => (
        <span key={start} style={styles}>{text}</span>
      ));
      // If the subBlock was empty, render a non-breaking space for layout.
      // This could also be done using CSS by explicitly setting line height + min-height,
      // and that might make more sense if we want to offer user-defined line heights.
      if (!content.length) {
        content = '\u00A0'; // Unicode nbsp
      }
      return (
        <SubBlockTag key={subBlock.getKey()}>
          {content}
        </SubBlockTag>
      );
    }).toArray();
  }
  
  render() {
    return (
      <div style={{ border: this.props.active ? '2px solid purple' : 'none', overflow: 'auto' }}>
        {this.renderBlockContent()}
      </div>
    );
  }
}

export default makeBlock(TextBlock);