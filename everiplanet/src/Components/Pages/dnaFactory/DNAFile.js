import React from 'react';
import '../../../styles/css/dnaFactory/DNAFile.css';

const DANFile = ({ dnas }) => {
  console.log(dnas);
  return (
    <div className='dna_list_row'>
      {dnas.map((dna) => {
        return <div key={`dna_item_${dna}`} className='dna_file'></div>;
      })}
    </div>
  );
};

export default DANFile;
