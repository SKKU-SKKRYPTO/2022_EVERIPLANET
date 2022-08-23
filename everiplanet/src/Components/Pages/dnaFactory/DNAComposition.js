import React from 'react';
import DNAFile from './DNAFile';
import strings from '../../../common/strings';
import '../../../styles/css/dnaFactory/DNAComposition.css';

const DNAComposition = () => {
  const DNAList = [['0', '1', '2']];
  return (
    <div className='dna_composition_frame'>
      <div className='dna_list_container'>
        <div className='dna_list_text'>{strings.myDNAs}</div>
        <div className='dna_list_box'>
          {DNAList.map((dna) => {
            return <DNAFile dnas={dna} />;
          })}
        </div>
      </div>
      <div className='dna_composition_area'>
        <div>
          <div className='parent1'></div>
          <div className='plus'></div>
          <div className='parent2'></div>
        </div>
        <div>
          <div>{strings.composition}</div>
        </div>
      </div>
    </div>
  );
};

export default DNAComposition;
