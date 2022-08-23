import React from 'react';
import '../../../styles/css/dnaFactory/DNAFactoryInstruction.css';
import ModalFrame from '../../../common/ModalFrame';
import strings from '../../../common/strings';

const DNAFactoryInstruction = (props) => {
  const { open, close, header } = props;

  return open ? (
    <ModalFrame _handleModal={close}>
      <div className='dna_factory_instruction_title'>
        <div className='dna_factory_instruction_title_text'>{strings.howToPlay}</div>
      </div>

      <div className={'dna_factory_instruction_box_list'}>
        <div className={'dna_factory_instruction_box'}>
          <div className={'dna_factory_instruction_box_title'}>11111</div>

          <div className={'dna_factory_instruction_box_text'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Varius sit amet mattis vulputate enim nulla.
          </div>
        </div>

        <div className={'dna_factory_instruction_box'}>
          <div className={'dna_factory_instruction_box_title'}>22222</div>

          <div className={'dna_factory_instruction_box_text'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Varius sit amet mattis vulputate enim nulla.
          </div>
        </div>

        <div className={'dna_factory_instruction_box'}>
          <div className={'dna_factory_instruction_box_title'}>33333</div>

          <div className={'dna_factory_instruction_box_text'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Varius sit amet mattis vulputate enim nulla.
          </div>
        </div>
      </div>
    </ModalFrame>
  ) : null;
};

export default DNAFactoryInstruction;
