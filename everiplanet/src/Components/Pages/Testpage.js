import React from "react"
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { CONTACT_ABI, CONTACT_ADDRESS } from '../../configs/contract';

function Testpage() {
    const [account, setAccount] = useState();
    const [brainies, setBrainies] = useState();
    const [nftName, setNftName] = useState();

    useEffect(() => {
        async function load() {
          const web3 = new Web3(Web3.givenProvider);
          const account = await web3.eth.requestAccounts();
    
          setAccount(account)
    
          const _brainies = await new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS)
          setBrainies(_brainies)
    
          const _nftName = await brainies.methods.name().call()
          setNftName(_nftName)
        }
    
        load();
    }, []);

    return (
        <div>
            <div> Your account is: {account} </div>
            <div> Brainies nftName is: {nftName} </div>
        </div>
    )
}

export default Testpage;