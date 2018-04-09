import { RichUtils, EditorState, ContentState } from 'draft-js';

// The types of blocks the user can insert.
export const BLOCK_TYPES = {
  TEXT: 'Text',
  IMAGE: 'Image',
};

// Block metadata for rendering blocks the user can insert.
export const BLOCKS = [
  { icon: 'T', type: BLOCK_TYPES.TEXT },
  { icon: 'I', type: BLOCK_TYPES.IMAGE },
];

// For use with Draft.js.
// The type of node that can be dragged and dropped.
export const DRAG_SOURCE_TYPE = 'Block';

// Initial state for blocks to have when inserted.
export const DEFAULT_BLOCKS = {
  [BLOCK_TYPES.TEXT]: {
    type: BLOCK_TYPES.TEXT,
    editorState: RichUtils.toggleBlockType(
      EditorState.createWithContent(ContentState.createFromText('Click to edit this text.')),
      'paragraph'
    )
  }
}