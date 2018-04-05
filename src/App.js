import React, { Component } from 'react';
import RichTextEditor from './rich-text-editor/RichTextEditor';
import './App.css';
import 'draft-js/dist/Draft.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RichTextEditor />
      </div>
    );
  }
}

export default App;
