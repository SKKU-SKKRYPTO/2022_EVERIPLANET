import React from "react"
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { START_BNUM, CONTACT_ABI, CONTACT_ADDRESS } from '../../configs/contract';

function DnaFactoryFts () {
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();
    const [brainies, setBrainies] = useState();

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

    return (
        <div>
            <div> DNA Factory Features</div>
            <div> Your account is: {account} </div>
            <button onClick={mintButtonClicked}>MINT</button>
            <div>
                <div>NFT List</div>
                {brainies&&(brainies.map((d) => <li key={d.id}>
                    <ul>
                        <li>id: {d.id}</li>
                        <li>dna: {d.dna}</li>
                        <li>abrasion: {d.abrasion}</li>
                    </ul>
                </li>))}
            </div>
        </div>
    )
}

export default DnaFactoryFts;