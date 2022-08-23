import React, { useState } from 'react';
import CompositionContent from './CompositionContent';
import CopyContent from './CopyContent';
import '../../../styles/css/dnaFactory/DNAFactory.css';

function DnaFactory() {
  const COPY = 0;
  const COMPOSITION = 1;
  const [currentTab, setCurrentTab] = useState(COPY);

  const handleClickCopyTab = () => {
    setCurrentTab(COPY);
  };

  const handleClickCompositoinTab = () => {
    setCurrentTab(COMPOSITION);
  };

  return (
    <div>
      <div className='page_title'>DNA Factory</div>
      <div>?</div>
      <div>Energy: 100</div>
      <div>X</div>
      <div>
        <div onClick={handleClickCopyTab}>Copy</div>
        <div onClick={handleClickCompositoinTab}>Composition</div>
        <div>{currentTab === COPY ? <CopyContent /> : <CompositionContent />}</div>
      </div>
    </div>
  );
}

export default DnaFactory;
