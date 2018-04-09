import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import { BLOCK_TYPES } from './shared/Constants';

const TEMPLATES_KEY = 'templates';

/**
 * Takes a template object and creates a serializable version
 * that can be saved somewhere.
 * @param {Array} blocks - the blocks in the template
 * @param {Object} meta - the template metadata
 * @returns {Object}
 */
const convertTemplateToRawData = (blocks, meta) => {
  const blockData = blocks.map((block) => {
    switch (block.type) {
      case BLOCK_TYPES.TEXT: {
        const content = convertToRaw(block.editorState.getCurrentContent());
        return {
          type: block.type,
          content
        };
      }
      default:
        throw new Error(`Block type ${block.type} serialization NYI`);
    }
  });
  const templateData = {
    meta,
    content: blockData
  };
  return templateData;
};

/**
 * Takes the serializable version of the template and reconsitutes
 * it into a loadable template.
 * @param {Object} rawTemplate 
 * @returns 
 */
const convertRawDataToTemplate = (rawTemplate) => {
  const blockData = rawTemplate.content.map((block) => {
    switch (block.type) {
      case BLOCK_TYPES.TEXT: {
        const contentState = convertFromRaw(block.content);
        return {
          type: block.type,
          editorState: EditorState.createWithContent(contentState)
        };
      }
      default:
        throw new Error(`Block type ${block.type} conversion NYI`);
    }
  });
  const meta = {
    ...rawTemplate.meta,
    lastModified: new Date(rawTemplate.meta.lastModified)
  };
  return {
    ...meta,
    blocks: blockData
  };
};

/**
 * Grabs all templates stored in localStorage.
 * This would probably be making network requests against some backend.
 * @returns {Object} - Templates in storage, keyed by name
 */
export const retrieveTemplates = () => {
  const savedTemplatesData = localStorage.getItem(TEMPLATES_KEY) || '{}';
  let savedTemplates;
  // Protect against tampered/corrupted data.
  // In the real world this would just come from a trusted backend, and
  // would be a non-issue. This still does not check that this data takes
  // the right shape, either. For the sake of time, we'll trust it.
  try {
    savedTemplates = JSON.parse(savedTemplatesData);
  } catch (e) {
    savedTemplates = {};
  }

  for (const [key, rawTemplate] of Object.entries(savedTemplates)) {
    savedTemplates[key] = convertRawDataToTemplate(rawTemplate);
  }
  
  return savedTemplates;
};

/**
 * Save the template to localStorage.
 * @param {Object} template 
 */
export const saveTemplate = (template) => {
  const metadata = {
    name: template.name,
    lastModified: new Date()
  };
  const rawTemplateData = convertTemplateToRawData(template.blocks, metadata);
  
  const templates = retrieveTemplates();

  // What we actually want is a database to handle IDs.
  // Here we're just keying off name.
  templates[metadata.name] = rawTemplateData;
  const serializedTemplateData = JSON.stringify(templates);

  localStorage.setItem(TEMPLATES_KEY, serializedTemplateData);
};