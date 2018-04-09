import React from 'react';

import './App.css';

import { saveTemplate } from './templateData';
import TemplateEditor from './template-editor/TemplateEditor';
import TemplateList from './template-list/TemplateList';

import { BLOCK_TYPES, DEFAULT_BLOCKS } from './shared/Constants';

const VIEWS = {
  TEMPLATE_EDITOR: Symbol('TemplateEditorView'),
  TEMPLATE_LIST: Symbol('TemplateListView')
};

/**
 * The main app class. This controls all of the app's views.
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.saveAndReturn = this.saveAndReturn.bind(this);
    this.updateCurrentTemplate = this.updateCurrentTemplate.bind(this);
    this.setTemplate = this.setTemplate.bind(this);
    
    this.state = {
      view: VIEWS.TEMPLATE_EDITOR,
      currentTemplate: {
        name: 'Sample Template',
        blocks: [DEFAULT_BLOCKS[BLOCK_TYPES.TEXT]]
      }
    };
  }

  /**
   * Save the current template and switch to the template list view. 
   * @memberof App
   */
  saveAndReturn() {
    saveTemplate(this.state.currentTemplate);
    this.setState({
      view: VIEWS.TEMPLATE_LIST
    });
  }

  /**
   * Apply template changes to the current template.
   * For use by child components to make changes to the template.
   * @param {Object} template - Template object representing the template.
   * @memberof App
   */
  updateCurrentTemplate(template) {
    // Apply new properties to the current template, without mutating.
    const newTemplate = { ...this.state.currentTemplate, ...template };
    this.setState({ currentTemplate: newTemplate });
  }

  /**
   * Set the template to be edited and swap to the template editor. 
   * @param {any} template - Template object representing the template.
   * @memberof App
   */
  setTemplate(template) {
    this.setState({ 
      currentTemplate: template,
      view: VIEWS.TEMPLATE_EDITOR
    });
  }

  render() {
    const SaveAndReturnButton = () => (
      <button onClick={this.saveAndReturn}>
        Save & Return to Templates
      </button>
    );
    
    let view, title, action;
    switch (this.state.view) {
      case VIEWS.TEMPLATE_EDITOR:
        view = <TemplateEditor template={this.state.currentTemplate} updateTemplate={this.updateCurrentTemplate} />;
        title = this.state.currentTemplate.name;
        action = <SaveAndReturnButton />;
        break;
      case VIEWS.TEMPLATE_LIST:
        view = <TemplateList loadTemplate={this.setTemplate} />;
        title = 'Templates';
        action = null;
        break;
      default:
        throw new Error('View not defined.');
    }
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <h1>{title}</h1>
          {action}
        </div>
        {view}
      </div>
    );
  }
}

export default App;
