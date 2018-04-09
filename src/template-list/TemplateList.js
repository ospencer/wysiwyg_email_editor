import React from 'react';

import { retrieveTemplates } from '../templateData';

class TemplateList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      templates: {}
    };
  }

  componentDidMount() {
    const templates = retrieveTemplates();
    this.setState({ templates });
  }

  render() {
    return (
      <div>
        <ul>
          {Object.entries(this.state.templates).map(([ key, template ]) => (
            <li key={template.name} onClick={() => this.props.loadTemplate(template)}>
              {`${template.name} - Last modified ${template.lastModified}`}
            </li>    
          ))}
        </ul>
      </div>
    );
  }
}

export default TemplateList;