import React, { useState } from 'react';
import DNACopy from './dnaCopy/DNACopy';
import DNAComposition from './dnaComposition/DNAComposition';
import strings from '../../common/strings';
import '../../styles/css/dnaFactory/DNAFactory.css';

const DNAFactoryPage = () => {
  const COPY = 0;
  const COMPOSITION = 1;

  const [currentTab, setCurrentTab] = useState(COPY);

  const handleClickCopy = () => {
    setCurrentTab(COPY);
  };

  const handleClickComposition = () => {
    setCurrentTab(COMPOSITION);
  };

  const getCurrentContent = () => {
    switch (currentTab) {
      default:
      case COPY:
        return <DNACopy />;
      case COMPOSITION:
        return <DNAComposition />;
    }
  };
  return (
    <div className='dna_factory_frame'>
      <div className='dna_factory_header'>
        <div className='dna_factory_title'>
          <div className='dna_factory_title_text'>
            {strings.dnaFactory}
            <div className='dna_factory_title_help_box'>
              <div className='dna_factory_title_help'>{strings.questionMark}</div>
            </div>
          </div>
        </div>

        <div className='energy_box'>
          <div className='energy'></div>
          {strings.energy}: 1000
        </div>
      </div>
      <div className='dna_factory_body'>
        <div className='dna_factory_tabs'>
          <div
            className={`dna_factory_tab ${currentTab === COPY ? 'dna_factory_tab__selected' : strings.empty}`}
            onClick={handleClickCopy}
          >
            {strings.copy}
          </div>
          <div
            className={`dna_factory_tab ${currentTab === COMPOSITION ? 'dna_factory_tab__selected' : strings.empty}`}
            onClick={handleClickComposition}
          >
            {strings.composition}
          </div>
        </div>
        <div className='dna_factory_content'>{getCurrentContent()}</div>
      </div>
    </div>
  );
};

export default DNAFactoryPage;