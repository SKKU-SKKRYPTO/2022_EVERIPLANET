import React, { useState } from 'react';
import styles from '../../../styles/css/dnaFactory/dnaCopy.module.css';
import DNABox from './DNABox';
import ChosenDNABOX from './ChosenDNABox';
import ReplicaBox from './ReplicaBox';
import img from '../../../styles/assets/png/brainies.png';

const DNACopy = () => {
  const [DNAdummyData, setDNADummyData] = useState([
    { hash: 0x0000, feature: 'none', img: img, abrasionRate: 0, isClicked: false },
    { hash: 0x0001, feature: 'none', img: img, abrasionRate: 10, isClicked: false },
    { hash: 0x0002, feature: 'none', img: img, abrasionRate: 20, isClicked: false },
    { hash: 0x0003, feature: 'none', img: img, abrasionRate: 20, isClicked: false },
    { hash: 0x0004, feature: 'none', img: img, abrasionRate: 20, isClicked: false },
  ]);

  const [replicaDummyData, setReplicaDummyData] = useState([
    { feature: 'none', ability: 'none', level: 0, active: 'none', number: 1 },
    { feature: 'none', ability: 'none', level: 0, active: 'none', number: 3 },
    { feature: 'none', ability: 'none', level: 0, active: 'none', number: 2 },
  ]);

  const onDNABoxClicked = (idx) => {
    let temp = DNAdummyData.slice();
    temp.map((item) => (item.isClicked = false));
    temp[idx].isClicked = true;
    setDNADummyData(temp);
  };

  const getChosenImg = () => {
    let temp = DNAdummyData.slice();
    let chosneDNA = undefined;
    temp.map((dna) => {
      if (dna.isClicked === true) chosneDNA = dna;
    });

    return chosneDNA === undefined ? { img: '#', abrasionRate: -1 } : chosneDNA;
  };

  return (
    <>
      <div className={styles.copy_page_wrapper}>
        <div className={styles.dna_wrapper}>
          <div className={styles.mini_title}>My DNAs</div>
          <div className={styles.dna_list}>
            {DNAdummyData.map((dna, idx) => {
              return <DNABox img={dna.img} isClicked={dna.isClicked} onClick={() => onDNABoxClicked(idx)} />;
            })}
          </div>
        </div>
        <div className={styles.copy_section_wrapper}>
          <ChosenDNABOX dna={getChosenImg()} />
          <button className={styles.copy_btn}>copy for 100 Energy</button>
        </div>
        <div className={styles.dna_wrapper}>
          <div className={styles.mini_title}>My Replicas</div>
          <div className={styles.dna_list}>
            {replicaDummyData.map((rep, idx) => {
              return <ReplicaBox number={rep.number} key={idx} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DNACopy;
