import React from 'react';

const ButtonControls = ({ resetActiveBlock, blurBlockSelection }) => {
  const onCancel = () => {
    resetActiveBlock();
    blurBlockSelection();
  };
  return (
    <div style={{ display: 'flex' }}>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={blurBlockSelection}>Save</button>
    </div>
  );
};

const TitleBar = ({ activeBlockType, resetActiveBlock, blurBlockSelection }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <h2>{activeBlockType ? `${activeBlockType} Block` : 'Drag blocks to add them:'}</h2>
    {
      activeBlockType ? 
      <ButtonControls 
        resetActiveBlock={resetActiveBlock} 
        blurBlockSelection={blurBlockSelection} 
      /> : null
    }
  </div>
);

export default TitleBar;