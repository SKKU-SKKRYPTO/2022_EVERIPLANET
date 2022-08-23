import React from "react"
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { START_BNUM, CONTACT_ABI, CONTACT_ADDRESS } from '../../configs/contract';

function Testpage() {
    const [account, setAccount] = useState();
    const [brainies, setBrainies] = useState();
    const [nftName, setNftName] = useState();

    useEffect(() => {
        async function load() {
          const web3 = new Web3(Web3.givenProvider);
          const account = await web3.eth.requestAccounts();
    
          setAccount(account)
    
          const _brainies = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS)
          setBrainies(_brainies)
        }
    
        load();
    }, []);

    useEffect(() => {
        if(brainies != null){
            brainies.getPastEvents('Mint', {
                filter: {to: account}, // Using an array means OR: e.g. 20 or 23
                fromBlock: START_BNUM,
                toBlock: 'latest'
            }).then(function(res){
                console.log(res) // same results as the optional callback above
            });
        }
    }, [brainies])

    const handler = async () => {
        const _nftName = await brainies.methods.name().call();
        setNftName(_nftName);
    }

    return (
        <div>
            <div> Your account is: {account} </div>
            <button onClick={handler}>Get Name</button>
            <div> Brainies nftName is: {nftName} </div>
        </div>
    )
}

export default Testpage;