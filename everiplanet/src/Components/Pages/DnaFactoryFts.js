import React from "react"
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { START_BNUM, CONTACT_ABI, CONTACT_ADDRESS } from '../../configs/contract';
import { db } from "../Firebase"

function DnaFactoryFts () {
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();
    const [brainies, setBrainies] = useState();
    const [dnaId, setDnaId] = useState();

    const handDnaIdChange = e=> {
        setDnaId(e.target.value);
      }

    useEffect(() => {
        async function load() {
          const web3 = new Web3(Web3.givenProvider);
          const accountArray = await web3.eth.requestAccounts();
    
          setAccount(accountArray[0])
    
          const _contract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS)
          setContract(_contract)
        }
    
        load();
    }, []);

    useEffect(() => {
        if(contract != null){
            getNFTsByOwnerAsync();
        }
    }, [contract])

    async function getNFTsByOwnerAsync() {
        const res = await contract.methods.getNFTsByOwner(account).call();
        setBrainies(res);
    }

    const mintButtonClicked = async () => {
        console.log(account);
        contract.methods.mintNFT().send({from: account})
        .on('receipt', (res) => {
            console.log(res)
        })
    }


    const registButtonClickd = async () => {
        const accounts = db.collection('accounts');

        accounts.doc(account)
            .get()
            .then(doc => {
                if (!doc.data()) {
                    accounts.doc(account)
                        .set({
                            num_of_replicas: 0,
                            total_generate: 0
                        })
                    
                    alert(`${account} 님, 환영합니다!`);
                }
                else {
                    alert('이미 등록된 계정입니다.');
                }
            })
    }

    const genButtonClicked = async () => {
        var dna = -1;
        brainies.forEach(b => {
            if (b.id == dnaId)
            {
                dna = b.dna;
                return; // break forEach()
            }
        });

        if (dna == -1)
        {
            alert(`해당 DNA를 보유하고 있지 않습니다.`);
            return; // return genButtonClicked
        }
           
        console.log(dnaId)
        console.log(brainies)
        console.log(account)
        

        const accounts = db.collection('accounts');

        accounts.doc(account)
            .get()
            .then(doc => {
                if (!doc.data())
                {
                    alert(`계정을 등록해주세요.`);
                    return;
                }


                const replicaId = doc.data().total_generate + 1

                db.doc(`/accounts/${account}`)
                    .update({
                        num_of_replicas: doc.data().num_of_replicas + 1,
                        total_generate: replicaId
                    });


                db.collection(`/accounts/${account}/replicas`)
                    .doc(`MyReplica-${replicaId}`)
                    .set({
                        create_date: new Date(),
                        DNA: dna, // string
                        mine_level: 1,
                        product_level: 1,
                        battle_level: 1
                    });

                alert(`Generated replica's ID : ${replicaId}`);
            })
    }

    return (
        <div>
            <div> DNA Factory Features</div>
            <div> Your account is: {account} </div>
            <button onClick={registButtonClickd}>REGIST</button><br></br>
            <button onClick={mintButtonClicked}>MINT</button><br></br>
            <div>
                <div>NFT List</div>
                {brainies&&(brainies.map((d) => <ul key={d.id}>
                    <ul>
                        <li>id: {d.id}</li>
                        <li>dna: {d.dna}</li>
                        <li>abrasion: {d.abrasion}</li>
                    </ul>
                    <br></br>
                </ul>))}
            </div>
            <div>
                <br></br>Enter DNA ID you want to Generate ..<br></br>
                <input value={dnaId} onChange={handDnaIdChange}></input><br></br>
                <button onClick={genButtonClicked}>GEN</button>
            </div>
        </div>
    )
}

export default DnaFactoryFts;