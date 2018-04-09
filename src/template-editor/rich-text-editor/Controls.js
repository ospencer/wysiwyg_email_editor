import React from 'react';

const TEXT_TYPES = [
  { label: 'Normal', style: 'paragraph' },
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const TextTypeSelect = ({ editorState, toggleBlockType }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <select onChange={(event) => toggleBlockType(event.target.value)} value={blockType}>
      {TEXT_TYPES.map(({ label, style }) => (
        <option value={style} key={style}>{label}</option>
      ))}
    </select>
  );
};

const InlineStyleSelection = ({ editorState, toggleInlineStyle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div style={{display: 'flex'}}>
      {INLINE_STYLES.map(({ label, style }) => (
        <button key={style} onClick={() => toggleInlineStyle(style)}>
          {label}{currentStyle.has(style) ? '*' : null}
        </button>
      ))}
    </div>
  );
};

const Controls = ({ editorState, toggleBlockType, toggleInlineStyle }) => (
  <div>
    <TextTypeSelect 
      editorState={editorState}
      toggleBlockType={toggleBlockType} 
    />
    <InlineStyleSelection
      editorState={editorState}
      toggleInlineStyle={toggleInlineStyle}
    />
  </div>
);

export default Controls;