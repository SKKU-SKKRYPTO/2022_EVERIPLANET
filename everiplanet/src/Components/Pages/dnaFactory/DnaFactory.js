import React, { useState } from 'react';
import DNACopy from './DNACopy';
import DNAComposition from './DNAComposition';
import DNAFactoryInstruction from './DNAFactoryInstruction';
import strings from '../../../common/strings';
import '../../../styles/css/dnaFactory/DNAFactory.css';

const DnaFactory = () => {
  const COPY = 0;
  const COMPOSITION = 1;

  const [currentTab, setCurrentTab] = useState(COPY);
  const [instructionOpen, setInstructionOpen] = useState(false);

  const handleClickCopy = () => {
    setCurrentTab(COPY);
  };

  const handleClickComposition = () => {
    setCurrentTab(COMPOSITION);
  };

  const openInstruction = () => {
    setInstructionOpen(true);
  };

  const closeInstruction = () => {
    setInstructionOpen(false);
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
    <div>
      <div className='dna_factory_frame'>
        <div className='dna_factory_header'>
          <div className='dna_factory_title'>
            <div className='dna_factory_title_text'>
              {strings.dnaFactory}
              <div className='dna_factory_title_help_box' onClick={openInstruction}>
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
      <DNAFactoryInstruction open={instructionOpen} close={closeInstruction} header='Modal heading'>
        plzz
      </DNAFactoryInstruction>
    </div>
  );
};

export default DnaFactory;
